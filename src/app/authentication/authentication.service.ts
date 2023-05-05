import {Injectable, } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface SignUpResponseData {
    name:string,
    login:string,
    '_id': string
}

interface SigninResponseData {
    token: string
}
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{
    constructor(private http: HttpClient) {}

    getErrorMessage(value: any, name:string) {
        if (value.hasError('required')) {
            return `Please provide a valid input`;
        }
        return value.hasError(name) ? `Not a valid input` : '';
    }

    signUp(name:string, login:string, password:string){
        return this.http.post<SignUpResponseData>('https://final-task-backend-test.up.railway.app/auth/signup', {
            name: name,
            login: login,
            password: password
        })
    }

    signIn(login:string, password:string){
        return this.http.post<SigninResponseData>('https://final-task-backend-test.up.railway.app/auth/signin', {
            login: login,
            password: password
        })
    }
}
