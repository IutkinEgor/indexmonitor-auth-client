import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromClientCardAction from '../client-card/client-card.action' 
import { ClientService } from "../../services/client.service";


@Injectable()
export class ClientCardEffects {
    
    constructor(private actions$: Actions, private clientService: ClientService){}

    clientSettingsLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientSettingsLoadRequest),
        switchMap(({id}) => this.clientService.loadClientSettings(id).pipe(
            map(payload =>  fromClientCardAction.clientSettingsLoadSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientSettingsLoadFailure({payload: error.error})))
        ))
        )
    );

    clientSettingsUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientSettingsUpdateRequest),
        switchMap(({id, payload}) => this.clientService.updateClientSettings(id, payload).pipe(
            map(payload => fromClientCardAction.clientSettingsUpdateSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientSettingsUpdateFailure(error)))
        ))
        )
    );

    tokenSettingsLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientTokenSettingsLoadRequest),
        switchMap(({id}) => this.clientService.loadClientTokenSettings(id).pipe(
            map(payload =>  fromClientCardAction.clientTokenSettingsLoadSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientTokenSettingsLoadFailure({payload: error.error})))
        ))
        )
    );

    tokenSettingsUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientTokenSettingsUpdateRequest),
        switchMap(({id, payload}) => this.clientService.updateClientTokenSettings(id, payload).pipe(
            map(payload => fromClientCardAction.clientTokenSettingsUpdateSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientTokenSettingsUpdateFailure(error)))
        ))
        )
    );

    clientScopesLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientScopesLoadRequest),
        switchMap(({id}) => this.clientService.loadClientScopes(id).pipe(
            map(payload =>  fromClientCardAction.clientScopesLoadSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientScopesLoadFailure({payload: error.error})))
        ))
        )
    );

    clientScopesAdd$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientScopesAddRequest),
        switchMap(({id, payload}) => this.clientService.addClientScopes(id, payload).pipe(
            map(payload => fromClientCardAction.clientScopesAddSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientScopesAddFailure(error)))
        ))
        )
    );

    clientScopesRemove$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientCardAction.clientScopesRemoveRequest),
        switchMap(({clientId, scopeId}) => this.clientService.removeClientScopes(clientId, scopeId).pipe(
            map(payload => fromClientCardAction.clientScopesRemoveSuccess({payload})),
            catchError(error => of(fromClientCardAction.clientScopesRemoveFailure(error)))
        ))
        )
    );


    // clientupdateClientSettingsSuccess = createEffect(() => this.actions$.pipe(
    //     ofType(fromClientCardAction.updateClientSettingsSuccess),
    //     tap(() => this.clientService.updateSuccess())),  { dispatch: false });




    // updateClientTokenSettings$ = createEffect(() => this.actions$.pipe(
    //     ofType(fromClientCardAction.updateClientTokenSettings),
    //     switchMap(({id, payload}) => this.clientService.updateTokenSettings(id, payload).pipe(
    //         map(payload =>  fromClientCardAction.updateClientTokenSettingsSuccess({payload})),
    //         catchError(error => of(fromClientCardAction.updateClientTokenSettingsFailure(error)))
    //     ))
    //     )
    // );
}
