import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

import {MatMenuModule} from "@angular/material/menu";
import {AppRoutingModule} from "./app-routing.module";
import {MatDividerModule} from "@angular/material/divider";

import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './authentication/edit-profile/edit-profile.component';
import { BoardComponent } from './board/board.component';
import {DashboardService} from "./dashboard/dashboard.service";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { AddTaskFormComponent } from './dialog/add-task-form/add-task-form.component';
import {DialogService} from "./dialog/dialog.service";
import {MatDialogClose, MatDialogModule} from "@angular/material/dialog";
import { AddColumnFormComponent } from './dialog/add-column-form/add-column-form.component';
import { DeleteWarningFormComponent } from './dialog/delete-warning-form/delete-warning-form.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {JwtService} from "./authentication/jwt.service";
import { CreateBoardComponent } from './dialog/create-board/create-board.component';
import { DeleteWarningColumnComponent } from './dialog/delete-warning-column/delete-warning-column.component';
import {AuthInterceptorService} from "./authentication/auth-interceptor.service";
import { EditTaskComponent } from './dialog/edit-task/edit-task.component';
import { DeleteWarningTaskComponent } from './dialog/delete-warning-task/delete-warning-task.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";
import { DeleteWarningUserComponent } from './dialog/delete-warning-user/delete-warning-user.component';
import { TranslatePipe } from './translate/translate.pipe';
import {TranslateService} from "./translate/translate.service";

export function setupTranslateServiceFactory(
    service: TranslateService): Function {
    return () => service.use('en');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    EditProfileComponent,
    BoardComponent,
    AddTaskFormComponent,
    AddColumnFormComponent,
    DeleteWarningFormComponent,
    CreateBoardComponent,
    DeleteWarningColumnComponent,
    EditTaskComponent,
    DeleteWarningTaskComponent,
    DeleteWarningUserComponent,
    TranslatePipe,

  ],
    imports: [
        BrowserModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatMenuModule,
        AppRoutingModule,
        MatDividerModule,
        DragDropModule,
        MatDialogModule,
        MatAutocompleteModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatChipsModule,
        MatSelectModule,


    ],
  providers: [
      MatSnackBar,
      DashboardService,
      DialogService,
      MatDialogClose,
      JwtService,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},

      TranslateService,
      {
          provide: APP_INITIALIZER,
          useFactory: setupTranslateServiceFactory,
          deps: [
              TranslateService
          ],
          multi: true
      }],
  bootstrap: [AppComponent]
})

export class AppModule { }
