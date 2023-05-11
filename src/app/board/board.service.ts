import {DashboardModel} from "../dashboard/dashboard.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BoardService {
    private columns: DashboardModel[] = [];
    constructor() {}

    boardsChanged = new Subject<DashboardModel[]>()

    setDashboard(dashboard: DashboardModel[]) {
        this.columns = dashboard;
    }

    getBoards() {
        return this.columns.slice();
    }
}
