import {Component, OnInit} from '@angular/core';
import {BoardService} from "./board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  constructor(private boardService:BoardService) {
  }
  columns = this.boardService.columns;
  onAddColumn(){
  }
  ngOnInit(){
    console.log(
    this.columns)
  }
}
