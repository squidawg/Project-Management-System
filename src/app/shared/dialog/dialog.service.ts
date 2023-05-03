import { Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, component: ComponentType<any>): void {
    this.dialog.open(component, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
