import {Injectable, } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {take, exhaustMap} from "rxjs/operators";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authenticationService: AuthenticationService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authenticationService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req)
                }
                const modifiedRequest = req.clone(
                    { headers: new HttpHeaders()
                        .set('Authorization', `Bearer ${user.token}`)
                    });
                return next.handle(modifiedRequest)
            })
        )
    }
}
