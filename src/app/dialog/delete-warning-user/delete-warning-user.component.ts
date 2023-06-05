import { Component } from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-delete-warning-user',
  templateUrl: './delete-warning-user.component.html',
  styleUrls: ['./delete-warning-user.component.css']
})
export class DeleteWarningUserComponent {
 constructor(private authentication: AuthenticationService) {
 }
 onSubmit(){
   this.authentication.deleteUser()
 }
}
