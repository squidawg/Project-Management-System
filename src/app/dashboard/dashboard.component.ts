import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {DashboardModel} from "./dashboard.model";
import {DashboardStorageService} from "./dashboard-storage.service";
import {DialogService} from "../shared/dialog/dialog.service";
import {DeleteWarningFormComponent} from "../shared/dialog/delete-warning-form/delete-warning-form.component";
import {BoardService} from "../board/board.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

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
      private router: Router) {}

  subscription!: Subscription;
  boards!: DashboardModel[];

  ngOnInit() {
    this.onFetch();
    this.subscription = this.dashboardService.boardsChanged
        .subscribe((columnData: DashboardModel[] ) => {
          this.boards = columnData;
        });
  }

  onFetch(){
    this.dashboardStorageService.fetchBoards();
  }

  onLoadBoard(i:number){
    this.boardService.setBoardId(i);
    this.router.navigate(['/board']);
  }

  onDelete(id: number, event: Event) {
    event.stopPropagation();
    this.dashboardStorageService.boardId = this.boards[id]._id;
    this.dialogService.openDialog(DeleteWarningFormComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
