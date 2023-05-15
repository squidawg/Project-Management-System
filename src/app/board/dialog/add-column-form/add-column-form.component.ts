import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef, MatDialogClose, MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardStorageService} from "../../board-storage.service";
import {BoardService} from "../../board.service";
import {DashboardService} from "../../../dashboard/dashboard.service";
import {BoardComponent} from "../../board.component";

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.css']
})

export class AddColumnFormComponent implements OnInit {
  createColumnForm!: FormGroup;
  boardId = this.boardService.getBoardId();
  board = this.dashboardService.getBoards();
  state = false;

  constructor(private formField: AuthenticationService,
              private boardStorageService: BoardStorageService,
              private boardService: BoardService,
              private dashboardService: DashboardService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.createColumnForm = new FormGroup({
          "columnTitle": new FormControl(null,
              [Validators.required, Validators.pattern('[a-zA-Z ]*')])
        });
  }

  onSubmit() {
    const boardId = this.board[this.boardId]._id;
    const title = this.createColumnForm.value.columnTitle;
    this.boardStorageService.postColumns(boardId, title);
  }
}
