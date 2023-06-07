import {Component, OnInit, } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardStorageService} from "../../board/board-storage.service";
import {BoardService} from "../../board/board.service";
import {DashboardService} from "../../dashboard/dashboard.service";
import {AuthenticationService} from "../../authentication/authentication.service";
import {DashboardStorageService} from "../../dashboard/dashboard-storage.service";

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.css']
})

export class AddColumnFormComponent implements OnInit {
  createColumnForm!: FormGroup;


  constructor(private boardStorageService: BoardStorageService,
              private boardService: BoardService,
              private dashboardService: DashboardService,
              private authentication: AuthenticationService,
              private dashboardStorageService: DashboardStorageService) {}

  ngOnInit() {
    this.createColumnForm = new FormGroup({
          "columnTitle": new FormControl(null,
              [Validators.required, Validators.pattern('^[A-Za-z0-9\\s\\W]+$')])
        });
  }

  onSubmit() {
    const boardId = this.dashboardStorageService.boardId;
    const title = this.createColumnForm.value.columnTitle;
    this.boardStorageService.postColumns(boardId, title);
  }

  onError(value: any){
    return this.authentication.getErrorMessage(value)
  }
}
