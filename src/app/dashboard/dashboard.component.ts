import {Component, OnInit,} from '@angular/core';
import {BoardService} from "../board/board.service";
import {Router} from "@angular/router";
import {DashboardModel} from "./dashboard.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private boardService:BoardService, private router: Router) {
  }
  boards = this.boardService.columns;

  ngOnInit() {
  }

  onDeleteBoard(i:number){
    this.boards.splice(i,1)
  }

  onLoadBoard(i:number){
    this.router.navigate(['board', i])
  }

}
