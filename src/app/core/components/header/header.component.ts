import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {Subscription} from "rxjs";
import {DialogService} from "../../../shared/components/dialog/dialog.service";
import {CreateBoardComponent} from "../../../shared/components/dialog/create-board/create-board.component";
import {Router} from "@angular/router";
import {TranslateService} from "../../../shared/pipes/translate.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  private userSub!: Subscription;
  isAuth = false;
  isTablet = false;
  screenWidth!: number;

  constructor(private authService: AuthenticationService,
              private dialogService: DialogService,
              private router: Router, private translateService: TranslateService) {}


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

  setLang(language: string){
    this.translateService.use(language);
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
      }, 600);
    }
    else {
      this.dialogService.openDialog(CreateBoardComponent);
    }
  }
}
