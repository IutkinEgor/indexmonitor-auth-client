import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromClientRegisterAction from '../client-register/client-register.action' 
import { ClientService } from "../../services/client.service";


@Injectable()
export class ClientRegisterEffects {
    
    constructor(private actions$: Actions, private clientService: ClientService){}

    loadClientRegister$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientRegisterAction.clientRegister),
        switchMap(({payload}) => this.clientService.registerClient(payload).pipe(
            map(payload =>  fromClientRegisterAction.clientRegisterSuccess({payload})),
            catchError(error => of(fromClientRegisterAction.clientRegisterFailure(error)))
        ))
        )
    );
}
