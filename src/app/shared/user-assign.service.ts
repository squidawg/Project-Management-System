import {ElementRef, Injectable} from '@angular/core';
import {ENTER} from "@angular/cdk/keycodes";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {AuthData} from "../authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class UserAssignService {
  separatorKeysCodes: number[] = [ENTER];
  userCtrl = new FormControl(null, [Validators.required]);

  filteredUsers!: Observable<AuthData[]>;

  private allUsers: AuthData[] = [];

  constructor() {
    this.filteredUsers = this.userCtrl.valueChanges
        .pipe(
         startWith(null),
        map((user: string| null ) =>
            (user ? this._filter(user) : this.allUsers.slice())
        ));
  }

  setUsers(users: AuthData[]){
    this.allUsers = users
  }

  getUsers(){
    return this.allUsers.slice();
  }

  add(event: MatChipInputEvent, users:AuthData[]): void {
    const value = (event.value || '').trim();

    for(let obj of this.allUsers){
      if (value && obj.hasOwnProperty(value)) {
        users.push(obj);
      }
    }

    event.chipInput!.clear();
    this.userCtrl.setValue(null);
  }

  remove(id: string, users:AuthData[]): void {
    const index = users.findIndex(obj=> obj._id === id)
    if (index >= 0) {
      users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent,
           userInput: ElementRef<HTMLInputElement>,
           users:AuthData[]): void {
    const user = this.allUsers.find(obj=> obj._id === event.option.value)
    users.push(user!);
    userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

   private _filter(value: string): AuthData[] {
   const filterValue = value.toLowerCase();
   return this.allUsers.filter(obj=> obj.name.toLowerCase().includes(filterValue));
  }
}
