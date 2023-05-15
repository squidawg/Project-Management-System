import { Injectable } from '@angular/core';
import { ColumnData } from "./board-storage.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor() { }

  private boardId!: number;
  private columns: ColumnData[] = [];

  boardsChanged = new Subject<ColumnData[]>();

  setColumns(columns: ColumnData[]){
    this.columns = columns;
    this.boardsChanged.next(this.columns.slice());
  }

  getColumns(){
    return this.columns.slice();
  }

  setBoardId(id:number) {
    this.boardId = id;
  }

  getBoardId(){
    return this.boardId;
  }
}
