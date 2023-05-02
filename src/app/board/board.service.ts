import {BoardModel} from "./board.model";
import {BoardsTaskModel} from "./boards.task.model";
import {DashboardModel} from "../dashboard/dashboard.model";

export class BoardService {
    columns: DashboardModel[] = [
        new DashboardModel(0,'Task Master',
            [
            new BoardModel('My column',
                [
                    new BoardsTaskModel('create a layout', 'task description'),
                    new BoardsTaskModel('change button color', 'task description'),
                    new BoardsTaskModel('go to lunch', 'task description'),
                ]),
            new BoardModel('My second column',
                [
                    new BoardsTaskModel('task name1', 'task description'),
                    new BoardsTaskModel('task name2', 'task description'),
                    new BoardsTaskModel('task name3', 'task description'),
                ]),
            new BoardModel('My third column',
                [
                    new BoardsTaskModel('task name4', 'task description'),
                    new BoardsTaskModel('task name5', 'task description'),
                    new BoardsTaskModel('task name6', 'task description'),
                ]),
        ],),
        new DashboardModel(1,'Agile Magician',
            [
                new BoardModel('My column1',
                    [
                        new BoardsTaskModel('create a layout', 'task description'),
                        new BoardsTaskModel('change button color', 'task description'),
                        new BoardsTaskModel('go to lunch', 'task description'),
                    ]),
                new BoardModel('My second column2',
                    [
                        new BoardsTaskModel('task name1', 'task description'),
                        new BoardsTaskModel('task name2', 'task description'),
                        new BoardsTaskModel('task name3', 'task description'),
                    ]),
                new BoardModel('My third column3',
                    [
                        new BoardsTaskModel('task name4', 'task description'),
                        new BoardsTaskModel('task name5', 'task description'),
                        new BoardsTaskModel('task name6', 'task description'),
                    ]),
            ],)
    ];
    getBoard(i:number) {
        const board = this.columns.find(column =>{
            return column.id === i;
        });
        return board?.boardContent;
    }
}
