import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {BoardService} from "./board.service";
import {SortedColumns, SortedDataService} from "./sorted-data.service";
import {catchError, tap} from "rxjs/operators";
import {omit} from "lodash";
import {throwError} from "rxjs";

export interface ColumnData {
   _id?: string,
  title: string,
  order: number,
  boardId: string,
}

@Injectable({
  providedIn: 'root'
})

export class BoardStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService,
              private boardService: BoardService,
              private sortedDataService: SortedDataService) { }

  columnId: string | undefined;
  boardId!: string;
  columns!: SortedColumns[];

    fetchColumns(id:string) {
        return this.http.get<ColumnData[]>(`https://quixotic-underwear-production.up.railway.app/boards/${id}/columns`)
            .pipe(tap(resData => {
                const columnData = resData.sort( (a,b) => a.order - b.order);
                this.boardService.setColumns(columnData);
                this.sortedDataService.setData(columnData);
            }), catchError( errRes => {
                const error = errRes.error?.message || errRes.statusText;
                return throwError(error);
            }))
  }

  postColumns(id:string, title: string) {
      this.columns = this.sortedDataService.getData();
      return this.http.post<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${id}/columns`,
          {
            title: title,
            order: this.columns.length === 0 ? 0: this.columns.length,
          })
          .pipe(tap(resData => {
              this.columns.push(resData);
              this.boardService.setColumns(this.columns);
              this.sortedDataService.setData(this.columns.slice());
          }), catchError(errRes => {
              const error = errRes.error?.message || errRes.statusText;
              return throwError(error);
          }))
  }

  patchColumns(columns: ColumnData[]) {
    const columnsCopy  = columns.map(obj=> omit(obj,['boardId', 'title', 'tasks']))
    return this.http.patch<ColumnData[]>('https://quixotic-underwear-production.up.railway.app/columnsSet',
        columnsCopy)
        .pipe(tap(resData => {
            this.boardService.setColumns(resData);
            this.sortedDataService.setData(columns);
        }), catchError(errRes => {
            const error = errRes.error?.message || errRes.statusText;
            return throwError(error);
        }))

  }

  deleteColumns() {
    const data = this.sortedDataService.getData();
    const columnsCopy = data.map(obj => omit(obj,['tasks']));
    return this.http.delete<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}/columns/${this.columnId}`)
        .pipe(tap((resData: ColumnData) => {
            const index = columnsCopy.map( obj => obj._id).indexOf(resData._id);
            data.splice(index, 1);
            this.boardService.setColumns(data.slice());
            this.sortedDataService.setData(data.slice());
        }), catchError(errRes => {
            const error = errRes.error?.message || errRes.statusText;
            return throwError(error);

        }))
  }

  putColumn(title:string){
      this.columns = this.boardService.getColumns()
      const column = this.columns.find(column => column._id === this.columnId);
      return this.http.put<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}/columns/${this.columnId}`,
          {
              title:title,
              order: column!.order
          }).pipe(tap( resData => {
          const columns = this.columns
              .map((obj) => obj._id === resData._id ? resData : obj)
          this.boardService.setColumns(columns.slice());
          this.sortedDataService.setData(columns.slice());
      }), catchError(errRes =>{
          const error = errRes.error?.message || errRes.statusText;
          return throwError(error);
      }))
  }
    setColumns(template: ColumnData[]){
        return this.http.post<ColumnData[]>('https://quixotic-underwear-production.up.railway.app/columnsSet', template)
            .pipe(catchError(errRes => {
                const error = errRes.error?.message || errRes.statusText;
                return throwError(error) ;
            }))
    }
}
