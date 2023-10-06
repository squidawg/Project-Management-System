import {APP_INITIALIZER, NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { SharedModule} from "../shared/shared.module";
import {TranslateService} from "../shared/pipes/translate.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "../authentication/services/auth-interceptor.service";
import {DashboardService} from "../dashboard/services/dashboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogClose} from "@angular/material/dialog";
import {DialogService} from "../shared/components/dialog/dialog.service";
import {JwtService} from "../authentication/services/jwt.service";
import {DeleteWarningFormComponent} from "../shared/components/dialog/delete-warning-form/delete-warning-form.component";
import {DeleteWarningColumnComponent} from "../shared/components/dialog/delete-warning-column/delete-warning-column.component";
import {DeleteWarningTaskComponent} from "../shared/components/dialog/delete-warning-task/delete-warning-task.component";
import {DeleteWarningUserComponent} from "../shared/components/dialog/delete-warning-user/delete-warning-user.component";

export function setupTranslateServiceFactory(
    service: TranslateService): Function {
    return () => service.use('en');
}

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        DeleteWarningFormComponent,
        DeleteWarningColumnComponent,
        DeleteWarningTaskComponent,
        DeleteWarningUserComponent
    ],
    imports: [ SharedModule ],
    exports: [
        HeaderComponent,
        FooterComponent,
        DeleteWarningFormComponent,
        DeleteWarningColumnComponent,
        DeleteWarningTaskComponent,
        DeleteWarningUserComponent],
    providers: [
        TranslateService,
        DashboardService,
        MatSnackBar,
        MatDialogClose,
        DialogService,
        JwtService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateServiceFactory,
            deps: [
                TranslateService
            ],
            multi: true
        }]
})
export class CoreModule {}
