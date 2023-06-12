import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DialogService} from "../dialog/dialog.service";
import {AddTaskFormComponent} from "../dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "../dialog/add-column-form/add-column-form.component";
import {BoardService} from "./board.service";
import {BoardStorageService, ColumnData} from "./board-storage.service";
import {forkJoin, Subscription} from "rxjs";
import {DeleteWarningColumnComponent} from "../dialog/delete-warning-column/delete-warning-column.component";
import {TasksStorageService} from "./tasks/tasks-storage.service";
import {TaskData, TasksService} from "./tasks/tasks.service";
import {SortedColumns, SortedDataService} from "./sorted-data.service";
import {Router} from "@angular/router";
import {EditTaskComponent} from "../dialog/edit-task/edit-task.component";
import {DeleteWarningTaskComponent} from "../dialog/delete-warning-task/delete-warning-task.component";

import {UserAssignService} from "../shared/user-assign.service";
import {DashboardStorageService} from "../dashboard/dashboard-storage.service";
import {SnackbarService} from "../shared/snackbar.service";

import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit, OnDestroy {

  constructor(
      private dialog: DialogService,
      private dashboardService: DashboardService,
      private dashboardStorageService: DashboardStorageService,
      private boardService: BoardService,
      private boardStorageService: BoardStorageService,
      private tasksService: TasksService,
      private tasksStorageService: TasksStorageService,
      private sortedDataService: SortedDataService,
      private router: Router,
      private userAssignService: UserAssignService,
      private snackBar: SnackbarService,
      private authentication: AuthenticationService
  ) {}

  boardsSubscription!: Subscription;
  tasksSubscription!: Subscription;

  columns!: ColumnData[];
  tasks!: TaskData[];
  sortedData!: SortedColumns[];

  taskIndex: boolean[] = [];
  columnIndex: boolean[] = [];

  isLoading = false;
  isEditing: boolean[] = [];


  ngOnInit() {
    this.onFetchUsers();
    this.onFetchData();

    this.boardsSubscription = this.boardService.boardsChanged
        .subscribe((columnData: ColumnData[]) => {
          this.columns = columnData;
          this.sortedDataService.afterFetch(this.columns, this.tasks);
          this.sortedData = this.sortedDataService.getData();
        });

    this.tasksSubscription = this.tasksService.tasksChanged
        .subscribe((taskData: TaskData[]) => {
          this.tasks = taskData;
          this.tasks.sort((a, b) => a.order - b.order);
          this.sortedDataService.afterFetch(this.columns, this.tasks);
          this.sortedData = this.sortedDataService.getData();
        });
  }

  onFetchUsers() {

    this.authentication.getUsers()
        .subscribe(resData => {
      this.userAssignService.setUsers(resData);
    }, errMessage => {
      this.snackBar.openSnackBar(errMessage);
    });

  }

  onFetchData() {
    const boardId = this.dashboardStorageService.boardId;
    if (boardId) {
      this.isLoading = true;
      const columns =  this.boardStorageService.fetchColumns(boardId);
      const tasks = this.tasksStorageService.fetchTasks(boardId);
        forkJoin([columns, tasks])
            .subscribe(([col, task]) => {
              this.isLoading = false;
              task.sort((a,b) => a.order - b.order);
              this.sortedDataService.afterFetch(col, task);
              this.sortedData = this.sortedDataService.getData();
            },errMessage => {
              this.snackBar.openSnackBar(errMessage);
        });
      } else {
        this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    this.boardsSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

  onAddColumn() {
    this.dialog.openDialog(AddColumnFormComponent);
  }

  onDeleteColumn(columnId:string, boardId:string) {
    this.boardStorageService.boardId = boardId;
    this.boardStorageService.columnId = columnId;
    this.dialog.openDialog(DeleteWarningColumnComponent);
  }

  dropColumn(event: CdkDragDrop<ColumnData[]>) {
    moveItemInArray(this.sortedData, event.previousIndex, event.currentIndex);
    this.sortedData.forEach((item, i) => {
      item.order = i;
    });
    this.boardStorageService.patchColumns(this.sortedData)
        .subscribe(
        () => {},
        errMessage => {
          this.snackBar.openSnackBar(errMessage);
        });
  }

  onTouchColumnTitle(index:number) {
    this.isEditing[index] = !this.isEditing[index];
  }

  onEditColumn(index:number, column: ColumnData) {
    this.boardStorageService.columnId = column!._id;
    this.boardStorageService.putColumn(column.title!)
        .subscribe(() => {
      this.isEditing[index] = !this.isEditing[index];
    }, errMessage => {
      this.snackBar.openSnackBar(errMessage);
    })
  }

  onAddTask(index: number) {
    this.tasksService.setTaskPath(
        this.columns[index]._id!,
        this.columns[index].boardId,
    );
    this.dialog.openDialog(AddTaskFormComponent);
  }

  onEditTask( task:TaskData) {
    this.tasksService.setTaskPath(
        task.columnId,
        task.boardId,
        task._id
        );
    this.dialog.openDialog(EditTaskComponent);
  }

  onDeleteTask(event: Event, task:TaskData) {
    event.stopPropagation();
    this.tasksService.setTaskPath(
        task.boardId,
        task.columnId,
        task._id
    );
    this.dialog.openDialog(DeleteWarningTaskComponent);
  }

  dropTask(event: CdkDragDrop<TaskData[] | any>, i: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
      event.container.data[event.currentIndex].columnId = this.columns[i]._id;
    }
    const taskData: TaskData[] = event.container.data;
    taskData.forEach((obj, i) => {
      obj.order = i;
    });
    this.tasksStorageService.patchTasks(taskData)
        .subscribe(
        () =>{},
                errMesage => {
      this.snackBar.openSnackBar(errMesage)
    });
  }

  onUserclick(event: Event, taskIndex: number, colIndex:number){
    event.stopPropagation();
    this.taskIndex[taskIndex] = !this.taskIndex[taskIndex];
    this.columnIndex[colIndex] = !this.columnIndex[colIndex]
  }

}
