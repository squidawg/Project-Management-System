import {Component, OnInit} from '@angular/core';
import {BoardService} from "./board.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardModel} from "./board.model";
import {ActivatedRoute} from "@angular/router";
import {DashboardModel} from "../dashboard/dashboard.model";
import {DialogService} from "../shared/dialog/dialog.service";
import {AddTaskFormComponent} from "./dialog/add-task-form/add-task-form.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  constructor(private boardService:BoardService, private route: ActivatedRoute, private dialog:DialogService) {
  }
  columns: DashboardModel | any = new DashboardModel(0,'',[
    new BoardModel('',
        []),
  ])
  onAddTask(start:string, end:string) {
    this.dialog.openDialog(start, end, AddTaskFormComponent)
  }

  onDeleteColumn(column: any) {
    const index = this.columns.indexOf(this.columns[column]);
    if (index >= 0) {
      this.columns.splice(index, 1);
    }
  }

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.columns = this.boardService.getBoard(+id);
  }

  dropColumn(event: CdkDragDrop<string[]>) {
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
