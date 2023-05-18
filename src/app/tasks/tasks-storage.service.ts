import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {TaskData, TasksService} from "../board/tasks/tasks.service";

@Injectable({
  providedIn: 'root'
})

export class TasksStorageService {
  constructor(private http: HttpClient,
              private userData: AuthenticationService,
              private tasksService: TasksService) { }

  columnId = '';
  boardId = '';
  tasks!: TaskData[];
  fetchTasks(boardId:string) {
      this.http.get<TaskData[]>(`https://final-task-backend-test.up.railway.app/tasksSet/${boardId}`)
          .subscribe(resData => {
            this.tasksService.setTasks(resData);
          });
  }

  postTasks(title:string, description:string) {
      this.tasks = this.tasksService.getTasks();
      this.http.post<TaskData>(`https://final-task-backend-test.up.railway.app/boards/${this.boardId}/columns/${this.columnId}/tasks`,
        {
          title: title,
          order: this.tasks.length === 0? 0: this.tasks.length,
          description: description,
          userId: this.userData.user.value.id,
          users: [],
        })
        .subscribe((resData:TaskData) => {
          this.tasks.push(resData);
          this.tasksService.setTasks(this.tasks.slice());
        });
  }
}
