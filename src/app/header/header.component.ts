import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {Subscription} from "rxjs";
import {DialogService} from "../shared/dialog/dialog.service";
import {CreateBoardComponent} from "../board/dialog/create-board/create-board.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  isAuth = false;

  constructor(private authService: AuthenticationService,
              private dialogService: DialogService,
              private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onCreateBoard(){
    this.router.navigate(['/dashboard'])
    this.dialogService.openDialog(CreateBoardComponent);
  }

}
