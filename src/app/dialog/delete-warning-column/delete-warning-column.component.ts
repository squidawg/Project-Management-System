import { Component } from '@angular/core';
import {BoardStorageService} from "../../board/board-storage.service";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-delete-warning-column',
  templateUrl: './delete-warning-column.component.html',
  styleUrls: ['./delete-warning-column.component.css']
})
export class DeleteWarningColumnComponent {
  constructor(private boardStorageService: BoardStorageService ,
              private snackBar: SnackbarService) {
  }

  onSubmit(){
    this.boardStorageService.deleteColumns().subscribe(
        ()=>{}, errMessage => {
          this.snackBar.openSnackBar(errMessage)
        });
  }
}
