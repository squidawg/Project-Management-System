import {BoardModel} from "./board.model";
import {BoardsTaskModel} from "./boards.task.model";

export class BoardService {
    columns: BoardModel[] = [new BoardModel('Test title',
    [
        new BoardsTaskModel('task name', 'task description'),
        new BoardsTaskModel('task name2', 'task description'),
        new BoardsTaskModel('task name3', 'task description'),
    ])]
}
