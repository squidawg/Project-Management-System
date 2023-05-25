import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksStorageService} from "../../tasks/tasks-storage.service";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  constructor(private tasksStorageService:TasksStorageService, private authentication: AuthenticationService,) {
  }
  editTaskForm!: FormGroup;

  ngOnInit() {
    this.editTaskForm = new FormGroup({
      "taskTitle": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      "taskDescription": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    });
  }

  onSubmit(){
    const title: string = this.editTaskForm.value.taskTitle;
    const description: string = this.editTaskForm.value.taskDescription;
    this.tasksStorageService.putTask(title, description);
  }

  onError(value: any, valueName: string){
    return this.authentication.getErrorMessage(value, valueName)
  }
}
