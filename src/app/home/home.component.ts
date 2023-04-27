import { Component } from '@angular/core';
import {HomeModel} from "./home.model";
@Component({
  selector: 'app-feature-description',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cardData: HomeModel[] = [
    new HomeModel('John Doe',
        'John is an experienced developer who has worked on a variety of web projects.',
        "../../assets/duck.jpeg"),
    new HomeModel('Jane Smith',
        'Jane is a talented designer who has worked on a number of high-profile projects.',
        "../../assets/duck.jpeg"),
    new HomeModel('Mike Johnson',
        'Mike is a seasoned project manager who has successfully led teams on a range of complex projects',
        "../../assets/duck.jpeg")
  ]
  constructor() {
  }
  contents: string[] = ['Stay organized and on track with our project manager app! With our intuitive dashboard, you can easily keep track of all your ongoing projects and deadlines.',
  'Our app\'s analytics and reporting features allow you to track project progress, identify issues, and make data-driven decisions to keep your projects on track.',
  'Worried about missing important deadlines or tasks? Our app has got you covered with customizable alerts and reminders. You\'ll never forget a task or deadline again!',
  'Need to collaborate with your team on a project? No problem! Our app makes it easy to add team members, assign tasks, and set deadlines.']
}
