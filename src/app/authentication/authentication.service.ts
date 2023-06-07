import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {tap} from "rxjs/operators";
import {JwtService} from "./jwt.service";
import {BehaviorSubject} from "rxjs";
import {JwtPayload} from "jwt-decode";
import {Router} from "@angular/router";
import {UserAssignService} from "../shared/user-assign.service";
import {TranslateService} from "@ngstack/translate";
export interface AuthData {
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
    private isTokenExpired: any;

    messageRequired!: string;
    messageInvalid!: string;

    constructor(private http: HttpClient,
                private jwt: JwtService,
                private router: Router,
                private userAssignService: UserAssignService,
                private translate: TranslateService) {
        this.messageRequired = this.translate.get('error_handler.required');
        this.messageInvalid = this.translate.get('error_handler.invalid');
    }

    getUsers() {
        return this.http.get<AuthData[]>('https://quixotic-underwear-production.up.railway.app/users')
            .pipe(tap( () => {
            }))

    }

    getErrorMessage(value: any) {
        if (value.hasError('required')) {
            return this.messageRequired;
        }

        return value.status === 'INVALID' ? this.messageInvalid : '';
    }

    signUp(name:string, login:string, password:string) {
        return this.http.post<AuthData>('https://quixotic-underwear-production.up.railway.app/auth/signup', {
            name: name,
            login: login,
            password: password
        }).pipe(tap(res => {
        }))
    }

    signIn(login:string, password:string) {
        return this.http.post<AuthData>('https://quixotic-underwear-production.up.railway.app/auth/signin', {
            login: login,
            password: password
        }).pipe(tap(resData => {
            this.parsedJwt = this.jwt.DecodeToken(resData.token);
            this.handleAuth(this.parsedJwt.login, this.parsedJwt.id, resData.token, this.parsedJwt.exp, this.parsedJwt.iat);
        }));
    }

    editUser(name:string, login:string, password:string){
        return this.http.put<AuthData>(`https://quixotic-underwear-production.up.railway.app/users/${this.user.value.id}`,{
            name:name,
            login:login,
            password:password
        }).pipe((tap(resData => {
            this.logout()
        })))
    }

    deleteUser(){
        this.http.delete<AuthData>(`https://quixotic-underwear-production.up.railway.app/users/${this.user.value.id}`).subscribe(resData => {
            this.logout()
        })
    }

    logout(){
        this.user.next(null!);
        this.router.navigate(['']);
        localStorage.removeItem('userData');
        if(this.isTokenExpired){
            clearTimeout(this.isTokenExpired);
        }
        this.isTokenExpired = null;
    }

    private handleAuth(login:string, userId: string, token: string, expiresIn:number, iat:number) {
        const  expDate = new Date(expiresIn * 1000);
        const user = new User(
            login,
            userId,
            token,
            expDate
            );
        this.user.next(user);
        this.autoLogout(expiresIn)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autoLogin(){
        const userData:{
            login:string
            id:string
            _token:string
            _tokenExp:string
        } = JSON.parse(localStorage.getItem('userData')!);
        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.login,
            userData.id,
            userData._token,
            new Date(userData._tokenExp));

        if (loadedUser.token){
            const expiresIn = new Date(userData._tokenExp).getTime() - new Date().getTime();
            this.autoLogout(expiresIn);
            this.user.next(loadedUser);
        }

    }

    autoLogout(expiration:number){
        this.isTokenExpired = setTimeout(()=>{
            this.logout()
        }, expiration)
    }
}
