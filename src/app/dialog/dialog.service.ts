import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {BoardStorageService} from "../board/board-storage.service";

@Injectable({
  providedIn: 'root'
})

export class DialogService {
  state: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(component: ComponentType<any>): void {
    const dialogRef = this.dialog.open(component, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.state = result
    });
  }
}
