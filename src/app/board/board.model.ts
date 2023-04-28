import {BoardsTaskModel} from "./boards.task.model";

export class BoardModel {
    constructor(public title: string, public tasks?: BoardsTaskModel[], public id?:number) {
    }
}
