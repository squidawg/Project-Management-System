import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  constructor(private authentication: AuthenticationService) {
  }
  name = this.authentication.authenticationModel.name;
  email = this.authentication.authenticationModel.email;
  password = this.authentication.authenticationModel.password;
  hide = true;

  onError(value: FormControl, valueName: string) {
    return this.authentication.getErrorMessage(value, valueName)
  }
}
