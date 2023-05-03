import {Injectable, OnInit} from '@angular/core';
import { AuthenticationModel } from "./authentication.model";
import {FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
    authenticationModel = new AuthenticationModel(
      new FormControl('', [Validators.required, Validators.email]),
      new FormControl('', [Validators.required, Validators.minLength(4)]),
      new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      new FormControl('', [Validators.required, Validators.minLength(4)]),
      new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]),
      new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]),
   )
    ngOnInit() {
    }

    getErrorMessage(value: FormControl, name:string) {
        if (value.hasError('required')) {
            return `Please provide a valid input`;
        }
        return value.hasError(name) ? `Not a valid input` : '';
    }
}
