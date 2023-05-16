import {Component} from '@angular/core';
import {DashboardStorageService} from "../../../dashboard/dashboard-storage.service";


@Component({
  selector: 'app-delete-warning-form',
  templateUrl: './delete-warning-form.component.html',
  styleUrls: ['./delete-warning-form.component.css']
})
export class DeleteWarningFormComponent{

  constructor(private dashboardService: DashboardStorageService) {}

  boardId = '';

  onSubmit(){
    this.boardId = this.dashboardService.boardId;
    this.dashboardService.deleteBoard(this.boardId);
  }
}
