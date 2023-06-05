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
      private snackBar: SnackbarService) {}

  searchCtrl = this.taskService.searchCtrl;

  filteredTasks: TaskData[] = [];
  subscription!: Subscription;
  boards!: DashboardModel[];

  isSearchLoad = false;
  isLoading = false;
  isShow = false;

  error!:string;

  ngOnInit() {
    this.onFetch();
    this.subscription = this.dashboardService.boardsChanged
        .subscribe((columnData: DashboardModel[] ) => {
          this.boards = columnData;
        }, errRes => {
          this.error = errRes.error.message;
          this.isLoading = !this.isLoading;
        });
  }

  onFetch(){
    this.isLoading = !this.isLoading;
    this.dashboardStorageService.fetchBoards().subscribe(resData => {
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
    this.isSearchLoad = !this.isSearchLoad
    this.dashboardStorageService.searchTask(this.searchCtrl.value!)
        .subscribe(resdata => {
          this.isSearchLoad = !this.isSearchLoad;
          this.filteredTasks = resdata;
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
