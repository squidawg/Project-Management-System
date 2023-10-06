import {NgModule} from "@angular/core";
import {BoardComponent} from "./components/board.component";
import {SharedModule} from "../shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CreateBoardComponent} from "../shared/components/dialog/create-board/create-board.component";
import {AddTaskFormComponent} from "../shared/components/dialog/add-task-form/add-task-form.component";
import {AddColumnFormComponent} from "../shared/components/dialog/add-column-form/add-column-form.component";
import {EditTaskComponent} from "../shared/components/dialog/edit-task/edit-task.component";
import {BoardRoutingModule} from "./board-routing.module";

@NgModule({
    declarations: [
        BoardComponent,
        CreateBoardComponent,
        AddTaskFormComponent,
        AddColumnFormComponent,
        EditTaskComponent,
    ],
    imports: [
        SharedModule,
        DragDropModule,
        BoardRoutingModule],
    exports: [
        BoardComponent,
        CreateBoardComponent,
        AddTaskFormComponent,
        AddColumnFormComponent,
        EditTaskComponent,
    ]
})

export class BoardModule {}
