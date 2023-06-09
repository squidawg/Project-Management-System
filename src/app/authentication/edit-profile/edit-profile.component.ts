import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {SnackbarService} from "../../shared/snackbar.service";
import {DialogService} from "../../dialog/dialog.service";
import {DeleteWarningUserComponent} from "../../dialog/delete-warning-user/delete-warning-user.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  isLoading = false;
  editUserForm!: FormGroup;
  hide = true;

  constructor(private authentication: AuthenticationService,
              private snackBar: SnackbarService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.editUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    });
  }

  onError(value: any, state?:boolean) {
    return this.authentication.getErrorMessage(value, state);
  }

  onSubmit(){
    const name = this.editUserForm.value.name;
    const login = this.editUserForm.value.login;
    const password = this.editUserForm.value.password;
    this.isLoading = true;
    this.authentication.editUser(name, login, password)
        .subscribe(() => {
      this.isLoading = false;
    }, errMessage => {
          this.snackBar.openSnackBar(errMessage)
          this.isLoading = false;
        });
  }
  onDeleteUser(){
    this.dialog.openDialog(DeleteWarningUserComponent)
  }
}
