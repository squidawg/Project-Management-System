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

  constructor(private authentication: AuthenticationService,
              private snackBar: SnackbarService,
              private dialog: DialogService) {
  }
  isLoading = false;
  editUserForm!: FormGroup;
  hide = true;
  error!:string;

  ngOnInit() {
    this.editUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    });
  }

  onError(value: any, valueName: string) {
    return this.authentication.getErrorMessage(value);
  }

  onSubmit(){
    const name = this.editUserForm.value.name;
    const login = this.editUserForm.value.login;
    const password = this.editUserForm.value.password;
    this.isLoading = true;
    this.authentication.editUser(name, login, password)
        .subscribe(resData => {
      this.isLoading = false;
    }, errRes => {
          this.error = errRes.error.message;
          this.snackBar.openSnackBar(this.error)
          this.isLoading = false;
        });
  }
  onDeleteUser(){
    this.dialog.openDialog(DeleteWarningUserComponent)
  }
}
