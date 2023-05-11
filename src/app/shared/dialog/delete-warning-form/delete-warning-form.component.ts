import {Component} from '@angular/core';
import {DashboardService} from "../../../dashboard/dashboard.service";
import {BoardService} from "../../../board/board.service";
import {DialogService} from "../dialog.service";

@Component({
  selector: 'app-delete-warning-form',
  templateUrl: './delete-warning-form.component.html',
  styleUrls: ['./delete-warning-form.component.css']
})
export class DeleteWarningFormComponent{

  constructor(private boardService: BoardService,
              private dashboardService: DashboardService,
              public dialog: DialogService) {}

  boardId = '';

  onSubmit(){
    this.boardId = this.dashboardService.boardId
    this.dashboardService.deleteBoard(this.boardId)
  }
}
