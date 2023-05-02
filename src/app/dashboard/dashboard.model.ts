import {BoardModel} from "../board/board.model";

export class DashboardModel {
    constructor(public id:number, public boardTitle: string, public boardContent: BoardModel[]) {
    }
}
