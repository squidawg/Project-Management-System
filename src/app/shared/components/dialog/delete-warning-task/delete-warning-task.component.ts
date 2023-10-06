import { Component } from '@angular/core';
import {TasksStorageService} from "../../../../board/services/tasks/tasks-storage.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-delete-warning-task',
  templateUrl: './delete-warning-task.component.html',
  styleUrls: ['./delete-warning-task.component.css']
})
export class DeleteWarningTaskComponent {
  constructor(private tasksStorageService:TasksStorageService,
              private snackBar:SnackbarService) {
  }

  onSubmit(){
    this.tasksStorageService.deleteTask().subscribe(
        ()=>{},
        errMes =>{
          this.snackBar.openSnackBar(errMes);
        })
  }
}
