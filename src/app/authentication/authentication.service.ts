import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {tap} from "rxjs/operators";
import {JwtService} from "./jwt.service";
import {BehaviorSubject} from "rxjs";
import {JwtPayload} from "jwt-decode";
import {Router} from "@angular/router";

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
    private isTokenExpired: any;
    constructor(private http: HttpClient,
                private jwt: JwtService,
                private router: Router) {}

    getErrorMessage(value: any, name:string) {
        if (value.hasError('required')) {
            return 'this is required';
        }
        return value.status === 'INVALID' ? `Not valid pattern` : '';
    }

    signUp(name:string, login:string, password:string){
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
            this.handleAuth(this.parsedJwt.login, this.parsedJwt.id, resData.token, this.parsedJwt.exp);
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



    logout(){
        this.user.next(null!);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.isTokenExpired){
            clearTimeout(this.isTokenExpired);
        }
        this.isTokenExpired = null;
    }

    private handleAuth(login:string, userId: string, token: string, expiresIn:number) {
        const  expDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
            login,
            userId,
            token,
            expDate
            );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autoLogin(){
        const userData:{
            login:string
            userId:string
            _token:string
            _tokenExp:string
        } = JSON.parse(localStorage.getItem('userData')!);
        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.login,
            userData.userId,
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
