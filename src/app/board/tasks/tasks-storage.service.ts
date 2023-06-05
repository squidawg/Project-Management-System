import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../authentication/authentication.service";
import {TaskData, TasksService} from "./tasks.service";
import * as _ from 'lodash';
import Enumerable from "linq";
import {map} from "rxjs/operators";
import {SnackbarService} from "../../shared/snackbar.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TasksStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService,
              private tasksService: TasksService,
              private snackBar: SnackbarService
              ) { }

  private tasks!: TaskData[];
  private error!: string;

  fetchTasks(boardId:string){
      this.http.get<TaskData[]>(`https://quixotic-underwear-production.up.railway.app/tasksSet/${boardId}`)
      .subscribe(resData => {
          this.tasks = resData;
          this.tasksService.setTasks(this.tasks.slice());
      }, errRes => {
          this.error = errRes.error.message;
          this.snackBar.openSnackBar(this.error);
      });
      // .pipe(map((resData: TaskData[]) => {
      //         this.tasks = resData;
      //         this.tasksService.setTasks(this.tasks.slice());
      // }))
  }

  postTasks(title:string, description:string, users:string[]) {
      this.tasks = this.tasksService.getTasks();
      const dataId = this.tasksService.getTaskPath()
      const sortedTasks = this.tasks.filter( task =>  task.columnId === dataId.columnId? task:[])
      this.http.post<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks`,
        {
          title: title,
          order: sortedTasks.length === 0? 0: sortedTasks.length,
          description: description,
          userId: this.userData.user.value.id,
          users: users,
        })
        .subscribe((resData:TaskData) => {
          this.tasks.push(resData);
          this.tasksService.setTasks(this.tasks.slice());
        }, errRes => {
            this.error = errRes.error.message || 'Undefined error';
            this.snackBar.openSnackBar(this.error);
        });
  }

  putTask(title: string, description:string, users:string[]){
    this.tasks = this.tasksService.getTasks();
    const dataId = this.tasksService.getTaskPath()
    const editedTask = this.tasks.find(item => item._id === dataId.taskId);

    this.http.put<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks/${dataId.taskId}`,
        {
            title: title,
            order: editedTask!.order,
            description: description,
            columnId: dataId.columnId,
            userId: this.userData.user.value.id,
            users: users
        })
        .subscribe(resData => {
            const newTask = this.tasks
                .map((obj) =>  obj._id === resData._id ? resData : obj)
            this.tasksService.setTasks(newTask.slice());
        }, errRes => {
            this.error = errRes.error.message;
            this.snackBar.openSnackBar(this.error);
        });
  }

  patchTasks(container:TaskData[]){
      this.tasks = this.tasksService.getTasks();

      const except = Enumerable.from(this.tasks)
          .except(Enumerable.from(container), obj => obj._id)
          .toArray();
      const taskData: TaskData[] = [...except, ...container]
      const tasksToPatch = taskData.map(obj =>
          _.omit(obj, [ 'title','description','userId','boardId','users' ]));
      this.http.patch<TaskData[]>('https://quixotic-underwear-production.up.railway.app/tasksSet',
          tasksToPatch)
          .subscribe(resData => {
          this.tasksService.setTasks(resData.slice());
      }, errRes => {
              this.error = errRes.error.message;
              this.snackBar.openSnackBar(this.error);
          })
  }

  deleteTask(){
      const dataId = this.tasksService.getTaskPath()
      this.http.delete<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks/${dataId.taskId}`)
          .subscribe((resData: TaskData) => {
              const index = this.tasks.map( obj=> obj._id).indexOf(resData._id);
              this.tasks.splice(index,1);
              this.tasksService.setTasks(this.tasks)
          }, errRes => {
              this.error = errRes.error.message;
              this.snackBar.openSnackBar(this.error);
          })
  }
}
