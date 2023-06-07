import {Component, HostListener, OnInit} from '@angular/core';
import {HomeModel} from "./home.model";
@Component({
  selector: 'app-feature-description',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  screenWidth!: number;

  cardData: HomeModel[] = [
    new HomeModel('John Doe',
        'John is an experienced developer who has worked on a variety of projects.',
        "../../assets/team.jpg") ,
    new HomeModel('Rachel Black',
        'is an experienced team lead with a proven track record of effectively managing.',
        "../../assets/ray.jpeg")]

  constructor() {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.screenWidth = window.innerWidth;
  }
}
