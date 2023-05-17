import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DashboardModel} from "./dashboard.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {DashboardService} from "./dashboard.service";

@Injectable({
  providedIn: 'root'
})

export class DashboardStorageService {
  constructor(private dashboardService: DashboardService,
              private http: HttpClient,
              private userData: AuthenticationService) {}
    boards!: DashboardModel[]
    boardId = '';

    fetchBoards() {
    this.http.get<DashboardModel[]>('https://final-task-backend-test.up.railway.app/boards')
        .subscribe(resData => {
            this.dashboardService.setBoards(resData);
        });
    }

    postBoard(title:string, owner:string) {
      this.boards = this.dashboardService.getBoards();
      this.http.post<DashboardModel>('https://final-task-backend-test.up.railway.app/boards',{
          title: title,
          owner: owner,
          users: []
      })
          .subscribe( resData => {
              this.boards.push(resData);
              this.dashboardService.setBoards(this.boards.slice())
        })

    }

    deleteBoard(id:string) {
        return this.http.delete<DashboardModel>(`https://final-task-backend-test.up.railway.app/boards/${id}`)
        .subscribe( resData => {
            this.boards = this.dashboardService.getBoards();
            const index = this.boards.map( obj => obj._id).indexOf(resData._id)
            this.boards.splice(index,1);
            this.dashboardService.setBoards(this.boards.slice())
    });
  }
}
