import { Component } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = this.authentication.authenticationModel.email;
  password = this.authentication.authenticationModel.password;
  hide = true;
  constructor(private authentication: AuthenticationService) {
  }
  onError(value: FormControl, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName)
  }
}
