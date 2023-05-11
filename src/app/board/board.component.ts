import {Component, OnInit} from '@angular/core';
import {BoardService} from "./board.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardModel} from "./board.model";
import {ActivatedRoute} from "@angular/router";
import {DashboardModel} from "../dashboard/dashboard.model";
import {DialogService} from "../shared/dialog/dialog.service";
import {AddTaskFormComponent} from "./dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "./dialog/add-column-form/add-column-form.component";
import {DeleteWarningFormComponent} from "../shared/dialog/delete-warning-form/delete-warning-form.component";
import {BoardsTaskModel} from "./boards.task.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit{
  constructor(private boardService:BoardService, private route: ActivatedRoute, private dialog:DialogService) {}

  columns: DashboardModel | any;

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    //this.columns = this.boardService.getBoard(+id);
  }


  onAddColumn() {
    // if(this.dialog.state === 'ok'){
    //   this.columns.push(new BoardModel('title',[]));
    // }
    this.dialog.state = '';
    this.dialog.openDialog(AddColumnFormComponent);
  }

  onAddTask() {
    this.dialog.openDialog(AddTaskFormComponent);
  }

  onDeleteColumn() {
    this.dialog.openDialog(DeleteWarningFormComponent);
  }

  onDeleteTask() {
    this.dialog.openDialog(DeleteWarningFormComponent);
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    //moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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
