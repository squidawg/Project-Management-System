import {Injectable, } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {tap} from "rxjs/operators";
import {JwtService} from "./jwt.service";
import {BehaviorSubject} from "rxjs";
import {JwtPayload} from "jwt-decode";

interface AuthData {
    name:string,
    login:string,
    '_id': string,
    token:string
}

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
    user = new BehaviorSubject<User>(null!);
    parsedJwt: JwtPayload | any;
    constructor(private http: HttpClient, private jwt: JwtService) {}

    getErrorMessage(value: any, name:string) {
        if (value.hasError('required')) {
            return `Please provide a valid input`;
        }
        return value.hasError(name) ? `Not a valid input` : '';
    }

    signUp(name:string, login:string, password:string){
        return this.http.post<AuthData>('https://final-task-backend-test.up.railway.app/auth/signup', {
            name: name,
            login: login,
            password: password
        }).pipe(tap(res => {
        }))
    }

    signIn(login:string, password:string) {
        return this.http.post<AuthData>('https://final-task-backend-test.up.railway.app/auth/signin', {
            login: login,
            password: password
        }).pipe(tap(resData => {
            this.parsedJwt = this.jwt.DecodeToken(resData.token);
            this.handleAuth(this.parsedJwt.login, this.parsedJwt.id, resData.token, this.parsedJwt.exp);
        }));
    }

    private handleAuth(login:string, userId: string, token: string, expiresIn:Date) {
        const  expDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            login,
            userId,
            token,
            expDate
            );
        this.user.next(user);
    }
}
