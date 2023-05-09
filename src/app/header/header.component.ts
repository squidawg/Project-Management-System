import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  isAuth = false
  constructor(private authService: AuthenticationService) {
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
