import {Component, DoCheck, OnInit} from '@angular/core';
import {BoardService} from "../board/board.service";
import {DashboardModel} from "./dashboard.model";
import {DashboardService} from "./dashboard.service";
import {DialogService} from "../shared/dialog/dialog.service";
import {DeleteWarningFormComponent} from "../shared/dialog/delete-warning-form/delete-warning-form.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, DoCheck{
  constructor(
      private dialogService: DialogService,
      private dashboardService: DashboardService,
      private boardService: BoardService) {}

  boards!: DashboardModel[];

  ngOnInit() {
    this.onFetch();
  }

  ngDoCheck() {
    this.boards = this.boardService.getBoards();
  }

  onFetch(){
    this.dashboardService.fetchBoards();
  }

  onDelete(id: number){
    this.dashboardService.boardId = this.boards[id]._id;
    this.dialogService.openDialog(DeleteWarningFormComponent);
  }
}
