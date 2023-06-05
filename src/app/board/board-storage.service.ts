import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {BoardService} from "./board.service";
import {SortedColumns, SortedDataService} from "./sorted-data.service";
import {map} from "rxjs/operators";
import {SnackbarService} from "../shared/snackbar.service";
import {omit} from "lodash";

export interface ColumnData {
   _id: string,
  title?: string,
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
              private sortedDataService: SortedDataService,
              private snackBar: SnackbarService) { }

  columnId = '';
  boardId!: string;
  columns!: SortedColumns[];
  error!:string;


    fetchColumns(id:string) {
        this.http.get<ColumnData[]>(`https://quixotic-underwear-production.up.railway.app/boards/${id}/columns`)
          .subscribe(resData => {
              const columnData = resData.sort( (a,b) => a.order - b.order);
              this.boardService.setColumns(columnData);
              this.sortedDataService.setData(columnData);
          }, errRes => {
              this.error = errRes.error.message;
              this.snackBar.openSnackBar(this.error);
          });
        // .pipe(map(resData => {
        //     const columnData = resData.sort( (a,b) => a.order - b.order);
        //     this.boardService.setColumns(columnData);
        //     this.sortedDataService.setData(columnData);
        // }, (errRes:any) => {
        //     this.error = errRes.error.message;
        //     this.snackBar.openSnackBar(this.error);
        // }))



  }

  postColumns(id:string, title: string) {
      this.columns = this.sortedDataService.getData();
      this.http.post<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${id}/columns`,
          {
            title: title,
            order: this.columns.length === 0 ? 0: this.columns.length,
          })
          .subscribe(resData=> {
            this.columns.push(resData);
            this.boardService.setColumns(this.columns);
            this.sortedDataService.setData(this.columns.slice());
      }, errRes => {
              this.error = errRes.error.message;
              this.snackBar.openSnackBar(this.error);
          });
  }

  patchColumns(columns: ColumnData[]) {
    const columnsCopy  = columns.map(obj=> omit(obj,['boardId', 'title', 'tasks']))
    this.http.patch<ColumnData[]>('https://quixotic-underwear-production.up.railway.app/columnsSet',
        columnsCopy)
         .subscribe(resData => {
            this.boardService.setColumns(resData);
            this.sortedDataService.setData(columns);
         }, errRes => {
             this.error = errRes.error.message;
             this.snackBar.openSnackBar(this.error);
         })
  }

  deleteColumns() {
    const data = this.sortedDataService.getData();
    const columnsCopy = data.map(obj => omit(obj,['tasks']));
    this.http.delete<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}/columns/${this.columnId}`)
        .subscribe((resData: ColumnData) => {
            const index = columnsCopy.map( obj=> obj._id).indexOf(resData._id);
            columnsCopy.splice(index,1);
            data.splice(index, 1)
            this.boardService.setColumns(columnsCopy.slice());
            this.sortedDataService.setData(data.slice());
        }, errRes => {
            this.error = errRes.error.message;
            this.snackBar.openSnackBar(this.error);
        })
  }

  putColumn(title:string){
      this.columns = this.boardService.getColumns()
      const column = this.columns.find(column => column._id === this.columnId)
      return this.http.put<ColumnData>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}/columns/${this.columnId}`,
          {
              title:title,
              order: column!.order
          }).pipe(map( resData => {
          const columns = this.columns
              .map((obj) => obj._id === resData._id ? resData : obj)
          this.boardService.setColumns(columns.slice());
          this.sortedDataService.setData(columns.slice())
      }))
  }
}
