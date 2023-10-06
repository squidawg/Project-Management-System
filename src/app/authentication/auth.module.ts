import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SharedModule} from "../shared/shared.module";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        EditProfileComponent,
    ],
    imports: [ SharedModule, AuthRoutingModule ],
    exports: [
        LoginComponent,
        SignupComponent,
        EditProfileComponent ]
})

export class AuthModule {}
