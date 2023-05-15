import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardStorageService} from "../../../dashboard/dashboard-storage.service";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit{
  createBoardForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateBoardComponent>,
              private dashboardService: DashboardStorageService,
              private user: AuthenticationService
              ) {}

  ngOnInit() {
    this.createBoardForm = new FormGroup({
      "titleBoard": new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z ]*')])
        }
    )
  }

  onSubmit() {
    const user = this.user.user.value.id;
    const title = this.createBoardForm.value.titleBoard;
    this.dashboardService.createBoard(title, user)
    this.createBoardForm.reset()
  }
}

