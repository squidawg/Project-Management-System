import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: HomeComponent}
]
@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)],
    exports: [HomeComponent, RouterModule],
})
export class HomeModule {}
