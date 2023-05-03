import { NgModule } from '@angular/core';
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
import {BoardService} from "./board/board.service";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { DialogComponent } from './shared/dialog/dialog.component';
import { AddTaskFormComponent } from './board/dialog/add-task-form/add-task-form.component';
import {DialogService} from "./shared/dialog/dialog.service";
import { MatDialogModule} from "@angular/material/dialog";


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
    DialogComponent,
    AddTaskFormComponent,

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
    ],
  providers: [BoardService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
