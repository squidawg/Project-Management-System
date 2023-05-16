import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {BoardService} from "./board.service";

export interface ColumnData {
   _id: string,
  title?: string,
  order: number,
  boardId?: string
}

@Injectable({
  providedIn: 'root'
})

export class BoardStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService, private boardService: BoardService
              ) {
  }

  columnId = '';
  boardId = '';
  columns!: ColumnData[]
  bearerToken = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userData.user.value.token}`);

  fetchColumns(id:string) {
      this.http.get<ColumnData[]>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`,
        { headers: this.bearerToken })
          .subscribe(resData => {
            const filtered = resData.sort( (a,b) => a.order - b.order)
            this.boardService.setColumns(filtered);
    });
  }

  postColumns(id:string, title: string){
      this.columns = this.boardService.getColumns();

      this.http.post<ColumnData>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`,
          {
      title: title,
      order: this.columns.length === 0 ? 0: this.columns.length,}
          , { headers: this.bearerToken })
          .subscribe(resData=> {
            this.columns.push(resData);
            this.boardService.setColumns(this.columns.slice());
      });
  }

  patchColumns(columns: ColumnData[]){
    const columnsCopy: ColumnData[] = JSON.parse(JSON.stringify(columns));
    columnsCopy.forEach((item: ColumnData) => {
        delete  item.boardId;
        delete  item.title;
    });

    this.http.patch<ColumnData[]>('https://final-task-backend-test.up.railway.app/columnsSet',
        columnsCopy, { headers: this.bearerToken })
         .subscribe(resData => {
            this.boardService.setColumns(resData);
         })
  }

  deleteColumns(boardId:string, columnId:string) {
    this.http.delete<ColumnData>(`https://final-task-backend-test.up.railway.app/boards/${boardId}/columns/${columnId}`,
        { headers: this.bearerToken })
        .subscribe((resData: ColumnData) => {
            this.columns = this.boardService.getColumns();

            const index = this.columns.map( obj=> obj._id).indexOf(resData._id)
            this.columns.splice(index,1);
            this.boardService.setColumns(this.columns.slice());
        })
  }
}
