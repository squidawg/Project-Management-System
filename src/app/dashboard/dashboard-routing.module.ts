import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard.component";
import {canActivateChild} from "../authentication/guards/authentication.guard";

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [canActivateChild]}
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}
