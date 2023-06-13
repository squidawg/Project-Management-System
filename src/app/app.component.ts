import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";
import {TranslateService} from "./translate/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ProjectManagementSystem';
  constructor(private authenticationService: AuthenticationService){

  }
  ngOnInit() {
    this.authenticationService.autoLogin();
  }
}
