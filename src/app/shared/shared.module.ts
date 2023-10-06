import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TranslatePipe} from "./pipes/translate.pipe";
import {TranformPipe} from "./pipes/tranform.pipe";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [TranslatePipe, TranformPipe],
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatTooltipModule,
        MatSelectModule,
        MatBadgeModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
    ],
    exports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatTooltipModule,
        MatSelectModule,
        MatBadgeModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        TranslatePipe,
        CommonModule,
        TranformPipe,
        RouterModule,
        HttpClientModule,
    ],
})
export class SharedModule {}
