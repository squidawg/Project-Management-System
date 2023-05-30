import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
  isTablet = false
  screenWidth!: number;

  constructor(private authService: AuthenticationService,
              private dialogService: DialogService,
              private router: Router) {}


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:Event) {
    this.screenWidth = window.innerWidth;
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onCreateBoard(){
    if(this.router.url !== '/dashboard'){
      this.router.navigate(['/dashboard'])
      setTimeout(() => {
        this.dialogService.openDialog(CreateBoardComponent);
      }, 300)
    }
    else {
      this.dialogService.openDialog(CreateBoardComponent);
    }
  }
}
