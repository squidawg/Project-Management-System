import {Component} from '@angular/core';
import {DashboardStorageService} from "../../../dashboard/dashboard-storage.service";
import {DashboardService} from "../../../dashboard/dashboard.service";
import {DialogService} from "../dialog.service";

@Component({
  selector: 'app-delete-warning-form',
  templateUrl: './delete-warning-form.component.html',
  styleUrls: ['./delete-warning-form.component.css']
})
export class DeleteWarningFormComponent{

  constructor(private boardService: DashboardService,
              private dashboardService: DashboardStorageService,
              public dialog: DialogService) {}

  boardId = '';

  onSubmit(){
    this.boardId = this.dashboardService.boardId
    this.dashboardService.deleteBoard(this.boardId)
  }
}
