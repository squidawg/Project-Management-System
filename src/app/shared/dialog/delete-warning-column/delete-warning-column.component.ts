import { Component } from '@angular/core';
import {BoardStorageService} from "../../../board/board-storage.service";

@Component({
  selector: 'app-delete-warning-column',
  templateUrl: './delete-warning-column.component.html',
  styleUrls: ['./delete-warning-column.component.css']
})
export class DeleteWarningColumnComponent {
  constructor(private boardStorageService: BoardStorageService) {
  }

  onSubmit(){
    const boardId = this.boardStorageService.boardId;
    const columnId = this.boardStorageService.columnId;
    this.boardStorageService.deleteColumns(boardId, columnId);
  }
}
