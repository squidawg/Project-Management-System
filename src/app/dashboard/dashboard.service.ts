import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DashboardModel} from "./dashboard.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {BoardService} from "../board/board.service";
import {tap} from "rxjs/operators";


interface BoardData {
    title: string,
    owner: string,
    users: string[]
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private boardService: BoardService, private http: HttpClient, private userData: AuthenticationService) {}
    boardId = '';
    bearerToken = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userData.user.value.token}`);
  fetchBoards() {
    this.http.get<DashboardModel[]>('https://final-task-backend-test.up.railway.app/boards',
        { headers: this.bearerToken })
        .subscribe(resData => {
            this.boardService.setDashboard(resData)
        })

  }

  createBoard(title:string, owner:string) {
      return this.http.post<BoardData>('https://final-task-backend-test.up.railway.app/boards',{
          title: title,
          owner: owner,
          users: []
      }, { headers: this.bearerToken } )
          .pipe(tap(resData => {
              this.fetchBoards()
          }))

  }

  deleteBoard(id:string){
    return this.http.delete(`https://final-task-backend-test.up.railway.app/boards/${id}`,{headers: this.bearerToken})
        .subscribe( resData => {
        this.fetchBoards()
    }
    )
  }
}
