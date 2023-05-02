import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./authentication/login/login.component";
import {SignupComponent} from "./authentication/signup/signup.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EditProfileComponent} from "./authentication/edit-profile/edit-profile.component";
import {BoardComponent} from "./board/board.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'edit', component: EditProfileComponent},
    {path: 'board/:id', component: BoardComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
