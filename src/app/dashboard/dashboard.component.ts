import {Component, OnInit,} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  boards: string[] = ['Task Master', 'Workflow Wizard', 'Agile Avenue'];

  ngOnInit() {
  }

  onDeleteBoard(i:number){
    this.boards.splice(i,1)
  }

}
