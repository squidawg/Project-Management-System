import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoardComponent} from "./components/board.component";
import {canActivateChild} from "../authentication/guards/authentication.guard";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
    {path: '', component: BoardComponent, canActivate: [canActivateChild]}
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BoardRoutingModule {

}
