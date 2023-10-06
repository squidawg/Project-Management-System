import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
    {path: '', loadChildren: () => import('./home/home.module')
            .then( m => m.HomeModule)},
    {path: 'auth', loadChildren: () => import('./authentication/auth.module')
            .then(m => m.AuthModule)},
    {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module')
            .then( m => m.DashboardModule)},
    {path: 'board', loadChildren: () => import('./board/board.module')
            .then(m => m.BoardModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
