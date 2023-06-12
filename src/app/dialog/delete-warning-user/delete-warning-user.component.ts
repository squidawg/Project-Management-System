import { Component } from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-delete-warning-user',
  templateUrl: './delete-warning-user.component.html',
  styleUrls: ['./delete-warning-user.component.css']
})
export class DeleteWarningUserComponent {
 constructor(private authentication: AuthenticationService, private snackBar:SnackbarService) {
 }
 onSubmit(){
   this.authentication.deleteUser()
       .subscribe(()=>{},
       (errorMessage => {
       this.snackBar.openSnackBar(errorMessage);
   }))
 }
}
