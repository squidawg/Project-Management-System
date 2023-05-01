import {Component, OnInit} from '@angular/core';
import {BoardService} from "./board.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardsTaskModel} from "./boards.task.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  constructor(private boardService:BoardService) {
  }
  columns = this.boardService.columns;
  connectedList: BoardsTaskModel[] = []
  onAddColumn(){
  }
  ngOnInit(){
    this.columns.forEach(el => {
      this.connectedList.push(el.tasks)
    })
    console.log(this.connectedList)
  }
  dropIt(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[] | any>) {

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
