import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../authentication/authentication.service";
import {TaskData, TasksService} from "./tasks.service";
import Enumerable from "linq";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {omit} from "lodash";


@Injectable({
  providedIn: 'root'
})

export class TasksStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService,
              private tasksService: TasksService,
              ) { }

  private tasks!: TaskData[];
  private error!: string;

  fetchTasks(boardId:string){
      return this.http.get<TaskData[]>(`https://quixotic-underwear-production.up.railway.app/tasksSet/${boardId}`)
          .pipe(tap(resData => {
              this.tasks = resData;
              this.tasksService.setTasks(this.tasks.slice());
          }), catchError(errRes => {
              const error = errRes.error.message || 'Undefined error';
              return throwError(error)
          }))
  }

  postTasks(title:string, description:string, users:string[]) {
      this.tasks = this.tasksService.getTasks();
      const dataId = this.tasksService.getTaskPath()
      const sortedTasks = this.tasks.filter( task =>  task.columnId === dataId.columnId? task:[])
      return this.http.post<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks`,
        {
          title: title,
          order: sortedTasks.length === 0? 0: sortedTasks.length,
          description: description,
          userId: this.userData.user.value.id,
          users: users,
        })
          .pipe(tap((resData:TaskData) => {
              this.tasks.push(resData);
              this.tasksService.setTasks(this.tasks.slice());
          }),
              catchError(errRes => {
              const error = errRes.error.message || 'Undefined error';
              return throwError(error)
          }))
  }

  putTask(title: string, description:string, users:string[]){
    this.tasks = this.tasksService.getTasks();
    const dataId = this.tasksService.getTaskPath()
    const editedTask = this.tasks.find(item => item._id === dataId.taskId);

    return this.http.put<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks/${dataId.taskId}`,
        {
            title: title,
            order: editedTask!.order,
            description: description,
            columnId: dataId.columnId,
            userId: this.userData.user.value.id,
            users: users
        })
        .pipe(tap(resData => {
            const newTask = this.tasks
                .map((obj) =>  obj._id === resData._id ? resData : obj)
            this.tasksService.setTasks(newTask.slice());
        }),catchError(errRes => {
            const error = errRes.error.message || 'Undefined error';
            return throwError(error)
        }))

  }

  patchTasks(container:TaskData[]){
      this.tasks = this.tasksService.getTasks();

      const except = Enumerable.from(this.tasks)
          .except(Enumerable.from(container), obj => obj._id)
          .toArray();
      const taskData: TaskData[] = [...except, ...container]
      const tasksToPatch = taskData.map(obj =>
          omit(obj, [ 'title','description','userId','boardId','users' ]));
      return this.http.patch<TaskData[]>('https://quixotic-underwear-production.up.railway.app/tasksSet',
          tasksToPatch)
          .pipe(tap(resData => {
              this.tasksService.setTasks(resData.slice());
          }), catchError(errRes => {
              const error = errRes.error.message || 'Undefined error';
              return throwError(error)
          }))
  }

  deleteTask(){
      const dataId = this.tasksService.getTaskPath()
      return this.http.delete<TaskData>(`https://quixotic-underwear-production.up.railway.app/boards/${dataId.boardId}/columns/${dataId.columnId}/tasks/${dataId.taskId}`)
          .pipe(tap((resData: TaskData) => {
              const index = this.tasks.map( obj=> obj._id).indexOf(resData._id);
              this.tasks.splice(index,1);
              this.tasksService.setTasks(this.tasks)
          }), catchError(errRes =>{
              const error = errRes.error.message || 'Undefined error';
              return throwError(error)
          }))
  }

    searchTask(search: string){
        const userId = this.userData.user.value
        return this.http.get<TaskData[]>(`https://quixotic-underwear-production.up.railway.app/tasksSet?userid=${userId}&search=${search}`)
            .pipe(catchError(errRes => {
                const error = errRes.error?.message || errRes.statusText;
                return throwError(error) ;
            }))
    }
}
