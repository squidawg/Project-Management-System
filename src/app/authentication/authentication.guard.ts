import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, map, take} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";
import {of} from "rxjs";


export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    return authService.user.pipe(
        take(1),
        map((user) => {
            const isAuth = !!user;
            if(isAuth){
                return true
            }
            return router.createUrlTree(['/login'])
        }),
        catchError(() => {
            router.navigate(['route-to-fallback-page']);
            return of(false);
        })
    );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);
