import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {TaskData, TasksService} from "../board/tasks/tasks.service";
import * as _ from 'lodash';
import {SortedColumns} from "../board/sorted-data.service";
import Enumerable from "linq";
import {omit} from "lodash";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class TasksStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService,
              private tasksService: TasksService,
              ) { }

  columnId = '';
  boardId = '';
  tasks!: TaskData[];
  sortedData!: SortedColumns[];

  fetchTasks(boardId:string) {
      this.http.get<TaskData[]>(`https://final-task-backend-test.up.railway.app/tasksSet/${boardId}`)
          .pipe(map((objects: TaskData[]) => {
              objects.sort((a, b) => a.columnId > b.columnId? 1 : -1);
              return objects
          }))
          .subscribe(resData => {
              this.tasks = resData;
              this.tasksService.setTasks(this.tasks.slice());
          })
  }

  postTasks(title:string, description:string) {
      this.tasks = this.tasksService.getTasks();
      const sortedTasks = this.tasks.filter( task =>  task.columnId === this.columnId? task:[])
      this.http.post<TaskData>(`https://final-task-backend-test.up.railway.app/boards/${this.boardId}/columns/${this.columnId}/tasks`,
        {
          title: title,
          order: sortedTasks.length === 0? 0: sortedTasks.length,
          description: description,
          userId: this.userData.user.value.id,
          users: [],
        })
        .subscribe((resData:TaskData) => {
          this.tasks.push(resData);
          this.tasksService.setTasks(this.tasks.slice());
        });
  }

  putTask(
      boardId: string,
      columnId: string,
      taskId:string,
      order: number,
      title: string,
      description:string,
      container:TaskData[]){
    // reason why tasks shuffle
    this.tasks = this.tasksService.getTasks();

    this.http.put<TaskData>(`https://final-task-backend-test.up.railway.app/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
            title: title,
            order: order === undefined? 0: order,
            description: description,
            columnId: columnId,
            userId: this.userData.user.value.id,
            users: []
        })
        .subscribe((resData => {
            const newTask = this.tasks
                .map((obj) =>  obj._id === resData._id ? resData : obj)
                .sort((a,b) => a.order - b.order)
            //this.tasksService.setTasks(newTask.slice());
        }));
  }

  patchTasks(container:TaskData[]){
      this.tasks = this.tasksService.getTasks();

      const except = Enumerable.from(this.tasks)
          .except(Enumerable.from(container), obj => obj._id)
          .toArray();
      const taskData: TaskData[] = [...except, ...container]
      const tasksToPatch = _.map(taskData, obj =>
          omit(obj, [ 'title','description','userId','boardId','users' ]));
      this.http.patch<TaskData[]>('https://final-task-backend-test.up.railway.app/tasksSet',
          tasksToPatch)
          .subscribe(resData => {
          this.tasksService.setTasks(resData.slice());
      })
  }
}
