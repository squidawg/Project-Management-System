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
    bearerToken = new HttpHeaders()
      .set('Authorization', `Bearer ${this.userData.user.value.token}`);

    fetchBoards() {
    this.http.get<DashboardModel[]>('https://final-task-backend-test.up.railway.app/boards',
        { headers: this.bearerToken })
        .subscribe(resData => {
            this.dashboardService.setBoards(resData);
        });
    }

    createBoard(title:string, owner:string) {
      this.boards = this.dashboardService.getBoards();
      this.http.post<DashboardModel>('https://final-task-backend-test.up.railway.app/boards',{
          title: title,
          owner: owner,
          users: []
      }, { headers: this.bearerToken } )
          .subscribe( resData => {
              this.boards.push(resData);
              this.dashboardService.setBoards(this.boards.slice())
        })

    }

    deleteBoard(id:string) {
        this.boards = this.dashboardService.getBoards();
        return this.http.delete<DashboardModel>(`https://final-task-backend-test.up.railway.app/boards/${id}`,
            {headers: this.bearerToken})
        .subscribe( resData => {
            const index = this.boards.indexOf(resData)
            this.boards.splice(index,1)
            this.dashboardService.setBoards(this.boards.slice())
    });
  }
}
