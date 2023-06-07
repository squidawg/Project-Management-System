import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    if(message === ''){
      message = 'Unknown error';
    }
    this._snackBar.open(message, 'ok', {
      duration: 3000
    });
  }
}
