import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private authentication: AuthenticationService) {
  }
  name = this.authentication.authenticationModel.name;
  password = this.authentication.authenticationModel.password;
  newPassword = this.authentication.authenticationModel.newPassword;
  hide = true;

  onError(value: FormControl, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName)
  }
}
