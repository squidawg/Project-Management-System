import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../../dashboard/services/dashboard.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DialogService} from "../../shared/components/dialog/dialog.service";
import {AddTaskFormComponent} from "../../shared/components/dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "../../shared/components/dialog/add-column-form/add-column-form.component";
import {BoardService} from "../services/board.service";
import {BoardStorageService, ColumnData} from "../services/board-storage.service";
import {forkJoin, Subscription} from "rxjs";
import {DeleteWarningColumnComponent} from "../../shared/components/dialog/delete-warning-column/delete-warning-column.component";
import {TasksStorageService} from "../services/tasks/tasks-storage.service";
import {TaskData, TasksService} from "../services/tasks/tasks.service";
import {SortedColumns, SortedDataService} from "../services/sorted-data.service";
import {Router} from "@angular/router";
import {EditTaskComponent} from "../../shared/components/dialog/edit-task/edit-task.component";
import {DeleteWarningTaskComponent} from "../../shared/components/dialog/delete-warning-task/delete-warning-task.component";
import {UserAssignService} from "../../authentication/services/user-assign.service";
import {DashboardStorageService} from "../../dashboard/services/dashboard-storage.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {AuthenticationService} from "../../authentication/services/authentication.service";

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
  isDrop = false;
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
    this.isDrop = !this.isDrop
    moveItemInArray(this.sortedData, event.previousIndex, event.currentIndex);
    this.sortedData.forEach((item, i) => {
      item.order = i;
    });
    this.boardStorageService.patchColumns(this.sortedData)
        .subscribe(
        () => {
          this.isDrop = !this.isDrop
        },
        errMessage => {
          this.snackBar.openSnackBar(errMessage);
          this.isDrop = !this.isDrop

        });
  }

  onTouchColumnTitle(index:number) {
    this.isEditing[index] = !this.isEditing[index];
  }

  onEditColumn(index:number, column: ColumnData) {
    this.boardStorageService.columnId = column!._id;
    this.boardStorageService.putColumn(column.title!)
        .subscribe(() => {
          this.isDrop = !this.isDrop
          this.isEditing[index] = !this.isEditing[index];
    }, errMessage => {
          this.isDrop = !this.isDrop

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
    this.isDrop = !this.isDrop
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
        () =>{
          this.isDrop = !this.isDrop
        },
                errMesage => {
                  this.isDrop = !this.isDrop
                  this.snackBar.openSnackBar(errMesage)
    });
  }

  onUserclick(event: Event, taskIndex: number, colIndex:number){
    event.stopPropagation();
    this.taskIndex[taskIndex] = !this.taskIndex[taskIndex];
    this.columnIndex[colIndex] = !this.columnIndex[colIndex]
  }
}
