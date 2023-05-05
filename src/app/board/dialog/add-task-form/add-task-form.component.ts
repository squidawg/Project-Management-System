import { Component } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent {

  constructor(public dialogRef: MatDialogRef<AddTaskFormComponent>, private formField: AuthenticationService) {
    }
    onError(value: FormControl, name:string){
      return this.formField.getErrorMessage(value, name)
    }
  }
