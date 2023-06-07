import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {DashboardModel} from "./dashboard.model";
import {DashboardStorageService} from "./dashboard-storage.service";
import {DialogService} from "../dialog/dialog.service";
import {DeleteWarningFormComponent} from "../dialog/delete-warning-form/delete-warning-form.component";
import {BoardService} from "../board/board.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TaskData, TasksService} from "../board/tasks/tasks.service";
import {SnackbarService} from "../shared/snackbar.service";
import {AuthenticationService} from "../authentication/authentication.service";
import {UserAssignService} from "../shared/user-assign.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
      private dialogService: DialogService,
      private dashboardStorageService: DashboardStorageService,
      private dashboardService: DashboardService,
      private boardService: BoardService,
      private router: Router,
      private taskService: TasksService,
      private snackBar: SnackbarService,
      private authentication: AuthenticationService,
      private userAssignService: UserAssignService) {}

  searchCtrl = this.taskService.searchCtrl;

  filteredTasks: TaskData[] = [];
  subscription!: Subscription;
  boards!: DashboardModel[];

  isSearchLoad = false;
  isLoading = false;
  isShow = false;

  error!:string;

  ngOnInit() {
    this.onFetchUsers();
    this.onFetch();
    this.subscription = this.dashboardService.boardsChanged
        .subscribe((columnData: DashboardModel[] ) => {
          this.boards = columnData;
        }, errRes => {
          this.error = errRes.error.message;
          this.isLoading = !this.isLoading;
        });
  }

  onFetchUsers(){
    this.authentication.getUsers().subscribe(resData => {
      const filteredUsers = resData.filter(obj => obj._id !== this.authentication.user.value.id);
      this.userAssignService.setUsers(filteredUsers)
    });
  }

  onFetch() {
    this.isLoading = !this.isLoading;
    this.dashboardStorageService.fetchBoards().subscribe(() => {
      this.isLoading = !this.isLoading;
    }, errRes => {
      this.error = errRes.error.message;
      this.snackBar.openSnackBar(this.error);
      this.isLoading = !this.isLoading;
    });
  }

  onLoadBoard(boardId:string) {
    this.dashboardStorageService.boardId = boardId;
    this.router.navigate(['/board']);
  }

  onDelete(event: Event, boardId:string) {
    event.stopPropagation();
    this.dashboardStorageService.boardId = boardId;
    this.dialogService.openDialog(DeleteWarningFormComponent);
  }

  onSearch(){
    this.isSearchLoad = !this.isSearchLoad;
    this.dashboardStorageService.searchTask(this.searchCtrl.value!)
        .subscribe(resData => {
          this.isSearchLoad = !this.isSearchLoad;
          this.filteredTasks = resData.filter(obj => obj.users.includes(this.authentication.user.value.id));
        }, errRes => {
          this.error = errRes.error.message;
          this.snackBar.openSnackBar(this.error);
        })
    this.isShow = true;

  }

  onBlur(){
    setTimeout(() =>{
      this.isShow = false
    }, 200)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
