import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksStorageService} from "../../tasks/tasks-storage.service";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})

export class AddTaskFormComponent implements OnInit{
  createTaskForm!: FormGroup;

  constructor(private tasksStorageService: TasksStorageService,
              private userData: AuthenticationService) {}

  ngOnInit() {
    this.createTaskForm = new FormGroup({
      "taskTitle": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      "taskDescription": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    });
  }

  onSubmit(){
    const title: string = this.createTaskForm.value.taskTitle;
    const description: string = this.createTaskForm.value.taskDescription;
    this.tasksStorageService.postTasks(title, description);
  }
}
