import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DashboardModel} from "./dashboard.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {DashboardService} from "./dashboard.service";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

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
        .pipe(tap(resData => {
            const filtered = resData.filter(obj => obj.users.includes(this.userData.user.value.id))
            this.dashboardService.setBoards(filtered);
        }), catchError(errRes => {
            const error = errRes.error?.message || errRes.statusText
            return throwError(error) ;
        }))

    }

    postBoard(title:string, owner:string, users:string[]) {
      users.push(this.userData.user.value.id)
      this.boards = this.dashboardService.getBoards();
      return this.http.post<DashboardModel>('https://quixotic-underwear-production.up.railway.app/boards',{
          title: title,
          owner: owner,
          users: users
      }).pipe(tap(resData => {
          this.boards.push(resData);
          this.dashboardService.setBoards(this.boards.slice())
      }
      ), catchError(errRes => {
          const error = errRes.error?.message || errRes.statusText
          return throwError(error) ;
      }))
    }

    deleteBoard() {
       return this.http.delete<DashboardModel>(`https://quixotic-underwear-production.up.railway.app/boards/${this.boardId}`)
            .pipe(tap(resData => {
                this.boards = this.dashboardService.getBoards();
                const index = this.boards.map( obj => obj._id).indexOf(resData._id)
                this.boards.splice(index,1);
                this.dashboardService.setBoards(this.boards.slice())
            }),catchError(errRes => {
                const error = errRes.error?.message || errRes.statusText;
                return throwError(error);
            }))
  }
}
