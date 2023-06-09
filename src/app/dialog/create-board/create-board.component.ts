import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardStorageService} from "../../dashboard/dashboard-storage.service";
import {AuthData, AuthenticationService} from "../../authentication/authentication.service";
import {UserAssignService} from "../../shared/user-assign.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit{
  createBoardForm!: FormGroup;
  userCtrl = this.userAssignService.userCtrl;


  selected: AuthData[] = [];

  separatorKeysCodes = this.userAssignService.separatorKeysCodes;
  filteredUsers = this.userAssignService.filteredUsers;

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<CreateBoardComponent>,
              private dashboardStorageService: DashboardStorageService,
              private user: AuthenticationService,
              private userAssignService: UserAssignService,
              private snackBar: SnackbarService
              ) {

  }

  ngOnInit() {
    this.createBoardForm = new FormGroup({
      "titleBoard": new FormControl(null,[Validators.required, Validators.pattern('^[A-Za-z0-9\\s\\W]+$')]),
    });
  }

  onAddUser(event: MatChipInputEvent){
    this.userAssignService.add(event,this.selected);
  }

  onDeleteUser(index:string){
    this.userAssignService.remove(index, this.selected);

  }

  onSelectUser(event: MatAutocompleteSelectedEvent){
    this.userAssignService.selected(
        event,
        this.userInput,
        this.selected);
  }

  onSubmit() {
    const users = this.selected.map( obj => obj._id)
    const owner = this.user.user.value.id;
    const title = this.createBoardForm.value.titleBoard;

    this.dashboardStorageService.postBoard(title, owner, users)
        .subscribe(
        () => {},
        errMessage => {
      this.snackBar.openSnackBar(errMessage);
    });
    this.createBoardForm.reset();
  }
}
