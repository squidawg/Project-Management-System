import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DashboardModel} from "./dashboard.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {DashboardService} from "./dashboard.service";
import {map} from "rxjs/operators";
import {TaskData} from "../board/tasks/tasks.service";

@Injectable({
  providedIn: 'root'
})

export class DashboardStorageService {
  constructor(private dashboardService: DashboardService,
              private http: HttpClient,
              private userData: AuthenticationService) {}

    boards!: DashboardModel[];
    boardId = '';

    fetchBoards() {
    return this.http.get<DashboardModel[]>('https://quixotic-underwear-production.up.railway.app/boards')
        .pipe(map(resData => {
            this.dashboardService.setBoards(resData);
        }))

    }

    postBoard(title:string, owner:string, users:string[]) {
      this.boards = this.dashboardService.getBoards();
      this.http.post<DashboardModel>('https://quixotic-underwear-production.up.railway.app/boards',{
          title: title,
          owner: owner,
          users: users
      })
          .subscribe( resData => {
              this.boards.push(resData);
              this.dashboardService.setBoards(this.boards.slice())
        })

    }

    deleteBoard() {
        return this.http.delete<DashboardModel>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}`)
        .subscribe( resData => {
            this.boards = this.dashboardService.getBoards();
            const index = this.boards.map( obj => obj._id).indexOf(resData._id)
            this.boards.splice(index,1);
            this.dashboardService.setBoards(this.boards.slice())
    });
  }
  searchTask(search: string){
        const userId = this.userData.user.value
         return this.http.get<TaskData[]>(`https://quixotic-underwear-production.up.railway.app/tasksSet?${userId}=USERID&search=${search}`)

  }

}
