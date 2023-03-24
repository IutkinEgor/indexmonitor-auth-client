import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";

import * as fromAuthenticationnAction from './identity.action' 


@Injectable()
export class IdentityEffects {
    
    constructor(private actions$: Actions, private authService: AuthService){}
    
    login = createEffect(() => this.actions$.pipe(
        ofType(fromAuthenticationnAction.authenticationRequest),
        tap(({payload}) => this.authService.login(payload))), {dispatch: false });

    logout = createEffect(() => this.actions$.pipe(
        ofType(fromAuthenticationnAction.logoutRequest),
        tap(() => this.authService.logout())),  { dispatch: false });

}
