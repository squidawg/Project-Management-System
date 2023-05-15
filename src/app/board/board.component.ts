import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DialogService} from "../shared/dialog/dialog.service";
import {AddTaskFormComponent} from "./dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "./dialog/add-column-form/add-column-form.component";
import {DeleteWarningFormComponent} from "../shared/dialog/delete-warning-form/delete-warning-form.component";
import {BoardService} from "./board.service";
import {BoardStorageService, ColumnData} from "./board-storage.service";
import {Subscription} from "rxjs";

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
  ) {}

  subscription!: Subscription;
  columns!: ColumnData[];
  boardId = this.boardService.getBoardId();
  board = this.dashboardService.getBoards();


  ngOnInit(){
    this.onFetchColumns();
    this.subscription = this.boardService.boardsChanged
        .subscribe((columnData:ColumnData[]) => {
          this.columns = columnData;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFetchColumns(){
    const boardId = this.board[this.boardId];
    this.boardStorageService.fetchColumns(boardId._id)
  }

  onFetchTasks() {}

  onAddColumn() {
    this.dialog.openDialog(AddColumnFormComponent);
  }

  onAddTask() {
    this.dialog.openDialog(AddTaskFormComponent);

  }

  onDeleteColumn() {
    // this.dialog.openDialog(DeleteWarningFormComponent);
  }

  onDeleteTask() {
    this.dialog.openDialog(DeleteWarningFormComponent);
  }

  dropColumn(event: CdkDragDrop<ColumnData[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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
