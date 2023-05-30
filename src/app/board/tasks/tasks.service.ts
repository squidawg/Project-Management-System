import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";

export interface TaskData {
  _id: string
  title:	string,
  order:	number,
  columnId: string,
  boardId: string
  description:	string,
  userId:	number,
  users:	string[],
}

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  searchCtrl = new FormControl(null)

  constructor() { }
  private taskData!: {
    columnId:string,
    boardId:string,
    taskId?:string
  }
  private tasks: TaskData[] = [];
  tasksChanged = new Subject<TaskData[]>();

  setTasks(tasks: TaskData[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }

  getTasks(){
    return this.tasks.slice();
  }

  setTaskPath(columnId:string, boardId:string, taskId?:string){
    this.taskData = {columnId, boardId, taskId}
  }

  getTaskPath(){
    return this.taskData
  }

}
