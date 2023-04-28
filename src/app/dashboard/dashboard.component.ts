import {Component, } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  boards: string[] = ['Task Master', 'Workflow Wizard', 'Agile Avenue']


  onDeleteBoard(i:number){
    this.boards.splice(i,1)
  }

}
