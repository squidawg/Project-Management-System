import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {BoardService} from "./board.service";
import { map, omit } from 'lodash';
import {SortedColumns, SortedDataService} from "./sorted-data.service";

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
              private sortedDataService: SortedDataService) { }

  columnId = '';
  boardId!: string;
  columns!: SortedColumns[];

  fetchColumns(id:string) {
      this.http.get<ColumnData[]>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`)
          .subscribe(resData => {
            const columnData = resData.sort( (a,b) => a.order - b.order);
            this.boardService.setColumns(columnData);
            this.sortedDataService.setData(columnData);
    });
  }

  postColumns(id:string, title: string) {
      this.columns = this.sortedDataService.getData();
      this.http.post<ColumnData>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`,
          {
            title: title,
            order: this.columns.length === 0 ? 0: this.columns.length,
          })
          .subscribe(resData=> {
            this.columns.push(resData);
            this.boardService.setColumns(this.columns);
            this.sortedDataService.setData(this.columns.slice());
      });
  }

  patchColumns(columns: ColumnData[]) {
    const columnsCopy = map(columns, obj => omit(obj, ['boardId', 'title', 'tasks']));
    this.http.patch<ColumnData[]>('https://final-task-backend-test.up.railway.app/columnsSet',
        columnsCopy)
         .subscribe(resData => {
            this.boardService.setColumns(resData);
            this.sortedDataService.setData(columns);
         })
  }

  deleteColumns(boardId:string, columnId:string) {
    const data = this.sortedDataService.getData();
    const columnsCopy = map(data, obj => omit(obj, ['tasks']));
    this.http.delete<ColumnData>(`https://final-task-backend-test.up.railway.app/boards/${boardId}/columns/${columnId}`)
        .subscribe((resData: ColumnData) => {
            const index = columnsCopy.map( obj=> obj._id).indexOf(resData._id);
            columnsCopy.splice(index,1);
            data.splice(index, 1)
            this.boardService.setColumns(columnsCopy.slice());
            this.sortedDataService.setData(data.slice());
        })
  }
}
