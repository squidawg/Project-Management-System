import {Component, HostListener, OnInit} from '@angular/core';
import {HomeModel} from "../home.model";
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: 'app-feature-description',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private translate: TranslateService) {}

  screenWidth!: number;

  cardData: HomeModel[] = [
    new HomeModel(this.translate.get('user.dev1.name'),
        this.translate.get('user.dev1.desc'),
        "../../assets/team.jpg") ,
    new HomeModel(this.translate.get('user.dev2.name'),
        this.translate.get('user.dev2.desc'),
        "../../assets/ray.jpeg")]

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.screenWidth = window.innerWidth;
  }
}
