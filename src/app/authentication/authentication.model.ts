import {FormControl} from "@angular/forms";

export class AuthenticationModel {
    constructor(public email: FormControl, public password: FormControl, public name: FormControl) {
    }
}
