import { Component } from '@angular/core';
import {MatDialogRef, MatDialogClose} from "@angular/material/dialog";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.css']
})
export class AddColumnFormComponent {

  constructor(public dialogRef: MatDialogRef<AddColumnFormComponent>, private formField: AuthenticationService, private dialogClose:MatDialogClose) {
  }

  onError(value: FormControl, name:string){
    return this.formField.getErrorMessage(value, name)
  }
  onOkClick(): void {
    this.dialogRef.close('ok');
  }
  onNoClick(): void {
    this.dialogRef.close('no');
  }

}
