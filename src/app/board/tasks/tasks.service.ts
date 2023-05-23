import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

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
  constructor() { }

  private tasks: TaskData[] = [];
  tasksChanged = new Subject<TaskData[]>();

  setTasks(tasks: TaskData[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }

  getTasks(){
    return this.tasks.slice();
  }

}
