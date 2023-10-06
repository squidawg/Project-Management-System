import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ColumnData} from "./board-storage.service";
import {TaskData} from "./tasks/tasks.service";
import Enumerable from "linq";

export interface SortedColumns {
  boardId: string;
  _id?: string;
  title: string;
  tasks?: TaskData[];
  order: number;
}

@Injectable({
  providedIn: 'root'
})


export class SortedDataService {

  constructor() {}

  private sortedData!: SortedColumns[];

  sortedDataChanged = new Subject<SortedColumns[]>();

  setData(data: SortedColumns[]){
    this.sortedData = data;
    this.sortedDataChanged.next(this.sortedData.slice());
  }

  getData(){
    return this.sortedData.slice();
  }

  afterFetch(columns:ColumnData[], tasks:TaskData[]) {
    this.sortedData =  Enumerable.from(columns)
        .groupJoin(
            Enumerable.from(tasks),
            col => col._id,
            task => task.columnId,
            (columns, tasks) => ({...columns, tasks: tasks.toArray()})
        ).toArray();
  }
}
