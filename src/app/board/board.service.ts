import {BoardModel} from "./board.model";
import {BoardsTaskModel} from "./boards.task.model";

export class BoardService {
    columns: BoardModel[] = [
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
    ]
}
