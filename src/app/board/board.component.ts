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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

export class BoardComponent implements OnInit, OnDestroy{
  constructor(
      private boardService:BoardService,
      private dialog: DialogService,
      private dashboardService: DashboardService,
      private boardStorageService: BoardStorageService,
      private tasksService: TasksService,
      private tasksStorageService: TasksStorageService
  ) {}

  boardsSubscription!: Subscription;
  tasksSubscription!: Subscription;

  columns!: ColumnData[];
  tasks!: TaskData[];

  boardId = this.boardService.getBoardId();
  board = this.dashboardService.getBoards();


  ngOnInit(){
    this.onFetchColumns();
    this.onFetchTasks();

    this.boardsSubscription = this.boardService.boardsChanged
        .subscribe((columnData:ColumnData[]) => {
          this.columns = columnData;
        });
    this.tasksSubscription = this.tasksService.tasksChanged
        .subscribe((taskData:TaskData[]) => {
          this.tasks = taskData;
        });
  }

  ngOnDestroy() {
    this.boardsSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

  onFetchColumns(){
    const boardId = this.board[this.boardId];
    this.boardStorageService.fetchColumns(boardId._id);
  }

  onAddColumn() {
    this.dialog.openDialog(AddColumnFormComponent);
  }

  onDeleteColumn(index:number) {
    this.boardStorageService.boardId = this.columns[index].boardId;
    this.boardStorageService.columnId = this.columns[index]._id;

    this.dialog.openDialog(DeleteWarningColumnComponent);
  }

  onAddTask(index:number) {
    this.tasksStorageService.boardId = this.columns[index].boardId;
    this.tasksStorageService.columnId = this.columns[index]._id;
    this.dialog.openDialog(AddTaskFormComponent);
  }


  onFetchTasks() {
    const boardId = this.board[this.boardId];
    this.tasksStorageService.fetchTasks(boardId._id);

  }

  onDeleteTask() {
    //this.dialog.openDialog(DeleteWarningFormComponent);
  }

  dropColumn(event: CdkDragDrop<ColumnData[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((item , i) => {
      item.order = i;
    });

    this.boardStorageService.patchColumns(this.columns.slice());
  }

  dropTask(event: CdkDragDrop<string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
    }
  }
}
