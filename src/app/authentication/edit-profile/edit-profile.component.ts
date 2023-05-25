import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  constructor(private authentication: AuthenticationService) {
  }
  isLoading = false;
  editUserForm!: FormGroup;
  hide = true;
  ngOnInit() {
    this.editUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'login': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\W)(?!.*\\s).{4,}$')])
    });
  }

  onError(value: any, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName);
  }

  onSubmit(){
    const name = this.editUserForm.value.name;
    const login = this.editUserForm.value.login;
    const password = this.editUserForm.value.password;
    this.isLoading = true;
    this.authentication.editUser(name, login, password).subscribe(resData => {
      this.isLoading = false;
    });
  }
}
