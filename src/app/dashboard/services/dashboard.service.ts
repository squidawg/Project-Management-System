import {DashboardModel} from "../dashboard.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private columns: DashboardModel[] = [];
    constructor() {}

    boardsChanged = new Subject<DashboardModel[]>()

    setBoards(dashboard: DashboardModel[]) {
        this.columns = dashboard;
        this.boardsChanged.next(this.columns.slice())
    }
    getBoards() {
        return this.columns.slice();
    }
}
