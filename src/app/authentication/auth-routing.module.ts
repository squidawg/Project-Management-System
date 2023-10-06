import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {SharedModule} from "../shared/shared.module";
import {canActivateChild} from "./guards/authentication.guard";

const routes: Routes = [
    {path: 'signin', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'edit', component: EditProfileComponent, canActivate: [canActivateChild]}
]
@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
