import { Component } from '@angular/core';
import {TasksStorageService} from "../../board/tasks/tasks-storage.service";

@Component({
  selector: 'app-delete-warning-task',
  templateUrl: './delete-warning-task.component.html',
  styleUrls: ['./delete-warning-task.component.css']
})
export class DeleteWarningTaskComponent {
  constructor(private tasksStorageService:TasksStorageService) {
  }
  onSubmit(){
    this.tasksStorageService.deleteTask()
  }
}
