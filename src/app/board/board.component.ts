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
import {TasksStorageService} from "../tasks/tasks-storage.service";
import {TaskData, TasksService} from "./tasks/tasks.service";
import {SortedColumns, SortedDataService} from "./sorted-data.service";
import {Router} from "@angular/router";


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
      private boardStorageService: BoardStorageService,
      private tasksService: TasksService,
      private tasksStorageService: TasksStorageService,
      private sortedDataService: SortedDataService,
      private router: Router
  ) {
  }

  boardsSubscription!: Subscription;
  tasksSubscription!: Subscription;
  sortedDataSubscription!: Subscription;

  columns!: ColumnData[];
  tasks!: TaskData[];
  sortedData!: SortedColumns[];

  boardId = this.boardService.getBoardId();
  board = this.dashboardService.getBoards();


  ngOnInit() {
    this.onFetchData()
    this.boardsSubscription = this.boardService.boardsChanged
        .subscribe((columnData: ColumnData[]) => {
          this.columns = columnData;
        });

    this.tasksSubscription = this.tasksService.tasksChanged
        .subscribe((taskData: TaskData[]) => {
          this.tasks = taskData;
          this.tasks.sort((a,b) => a.order - b.order)
          this.sortedDataService.afterFetch(this.columns, this.tasks)
          this.sortedData = this.sortedDataService.getData()
        });

    this.sortedDataSubscription = this.sortedDataService.sortedDataChanged
        .subscribe((data: SortedColumns[]) => {
          this.sortedData = data
          this.sortedDataService.afterFetch(this.columns, this.tasks)
          this.sortedData = this.sortedDataService.getData()
        })

  }


  ngOnDestroy() {
    this.boardsSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
    this.sortedDataSubscription.unsubscribe();
  }


  onAddColumn() {
    this.dialog.openDialog(AddColumnFormComponent);
  }

  onDeleteColumn(index: number) {
    this.boardStorageService.boardId = this.columns[index].boardId;
    this.boardStorageService.columnId = this.columns[index]._id;
    this.dialog.openDialog(DeleteWarningColumnComponent);
  }

  onAddTask(index: number) {
    this.tasksStorageService.boardId = this.sortedData[index].boardId;
    this.tasksStorageService.columnId = this.sortedData[index]._id;
    this.dialog.openDialog(AddTaskFormComponent);
  }

  onFetchData() {
    const boardId = this.board[this.boardId];
    if (boardId) {
      this.boardStorageService.fetchColumns(boardId._id);
      this.tasksStorageService.fetchTasks(boardId._id);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  onDeleteTask() {
    //this.dialog.openDialog(DeleteWarningFormComponent);
  }

  dropColumn(event: CdkDragDrop<ColumnData[]>) {
    moveItemInArray(this.sortedData, event.previousIndex, event.currentIndex);
    this.sortedData.forEach((item, i) => {
      item.order = i;
    });
    this.boardStorageService.patchColumns(this.sortedData);

  }

  dropTask(event: CdkDragDrop<TaskData[] | any>, i: number) {
    const id = this.columns[i]._id

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
      event.container.data[event.currentIndex].columnId = id
    }
    const taskData: TaskData[] = event.container.data
    taskData.forEach((obj, i) => {
      obj.order = i;
    })
    console.log(taskData)
    this.tasksStorageService.patchTasks(taskData)
  }
}
