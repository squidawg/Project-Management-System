import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {BoardService} from "./board.service";

export interface ColumnData {
  title: string,
  order: number,
}

@Injectable({
  providedIn: 'root'
})

export class BoardStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService, private boardService: BoardService
              ) {

  }
  columns!: ColumnData[]
  bearerToken = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userData.user.value.token}`);

  fetchColumns(id:string) {
      this.http.get<ColumnData[]>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`,
        { headers: this.bearerToken })
          .subscribe(resData => {
            this.boardService.setColumns(resData);
    });
  }

  postColumns(id:string, title: string){
      this.columns = this.boardService.getColumns();
      this.http.post<ColumnData>(`https://final-task-backend-test.up.railway.app/boards/${id}/columns`, {
      title: title,
      order: 0,
    }, { headers: this.bearerToken })
          .subscribe(resData=> {
            this.columns.push(resData);
              this.boardService.setColumns(this.columns.slice())
              this.boardService.boardsChanged.next(this.columns.slice());
      })
  }
}
