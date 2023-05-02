import {BoardsTaskModel} from "./boards.task.model";

export class BoardModel {
    constructor(public title: string| any, public tasks: BoardsTaskModel[] | any) {
    }
}
