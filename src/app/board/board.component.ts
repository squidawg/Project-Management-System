import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DialogService} from "../shared/dialog/dialog.service";
import {AddTaskFormComponent} from "./dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "./dialog/add-column-form/add-column-form.component";
import {BoardService} from "./board.service";
import {BoardStorageService, ColumnData} from "./board-storage.service";
import {Subscription} from "rxjs";
import {DeleteWarningColumnComponent} from "../shared/dialog/delete-warning-column/delete-warning-column.component";
import {TasksStorageService} from "./tasks/tasks-storage.service";
import {TaskData, TasksService} from "./tasks/tasks.service";
import {SortedColumns, SortedDataService} from "./sorted-data.service";
import {Router} from "@angular/router";
import {EditTaskComponent} from "./dialog/edit-task/edit-task.component";
import {DeleteWarningTaskComponent} from "../shared/dialog/delete-warning-task/delete-warning-task.component";

import {UserAssignService} from "../shared/user-assign.service";
import {DashboardStorageService} from "../dashboard/dashboard-storage.service";
import {SnackbarService} from "../shared/snackbar.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit, OnDestroy {
  constructor(
      private boardService: BoardService,
      private dialog: DialogService,
      private dashboardService: DashboardService,
      private dashboardStorageService: DashboardStorageService,
      private boardStorageService: BoardStorageService,
      private tasksService: TasksService,
      private tasksStorageService: TasksStorageService,
      private sortedDataService: SortedDataService,
      private router: Router,
      private userAssignService: UserAssignService,
      private snackBar: SnackbarService
  ) {
  }

  boardsSubscription!: Subscription;
  tasksSubscription!: Subscription;
  sortedDataSubscription!: Subscription;

  columns!: ColumnData[];
  tasks!: TaskData[];
  sortedData!: SortedColumns[];

  isLoading = false;
  isEditing: boolean[] = [];
  error!: string


  ngOnInit() {
    this.onFetchData();
    this.boardsSubscription = this.boardService.boardsChanged
        .subscribe((columnData: ColumnData[]) => {
          this.columns = columnData;

        });

    this.tasksSubscription = this.tasksService.tasksChanged
        .subscribe((taskData: TaskData[]) => {
          this.tasks = taskData;
          this.tasks.sort((a,b) => a.order - b.order);
          this.sortedDataService.afterFetch(this.columns, this.tasks);
          this.sortedData = this.sortedDataService.getData();
        });

    this.sortedDataSubscription = this.sortedDataService.sortedDataChanged
        .subscribe((data: SortedColumns[]) => {
          this.isLoading = false;
          this.sortedData = data;
          this.sortedDataService.afterFetch(this.columns, this.tasks);
          this.sortedData = this.sortedDataService.getData();
        }, errRes => {
          this.error = errRes.error.message;
          this.snackBar.openSnackBar(this.error);
        })

  }

  onFetchData() {
    const boardId = this.dashboardStorageService.boardId
    if (boardId) {
      this.isLoading = true;
      this.boardStorageService.fetchColumns(boardId);
      this.tasksStorageService.fetchTasks(boardId);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy() {
    this.boardsSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
    this.sortedDataSubscription.unsubscribe();
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
    this.boardStorageService.patchColumns(this.sortedData);
  }

  onTouchColumnTitle(index:number){
    this.isEditing[index] = !this.isEditing[index];
  }

  onEditColumn(index:number, column: ColumnData){
    this.boardStorageService.columnId = column._id
    this.boardStorageService.putColumn(column.title!).subscribe(resData => {
      this.isEditing[index] = !this.isEditing[index];
    }, errRes => {
      this.error = errRes.error.message;
      this.snackBar.openSnackBar(this.error);
    })
  }

  onAddTask(index: number) {
    this.tasksService.setTaskPath(
        this.columns[index]._id,
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
    })
    this.tasksStorageService.patchTasks(taskData);
  }
}
