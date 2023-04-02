import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromClientAction from './client.action' 
import { ClientService } from "../services/client.service";


@Injectable()
export class ClientEffects {
    
    constructor(private actions$: Actions, private clientService: ClientService){}

    loadClientTable$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientPageLoadRequest),
        switchMap(({page, size}) => this.clientService.loadClientPage(page, size).pipe(
            map(payload =>  fromClientAction.clientPageLoadSuccess({payload})),
            catchError(error => of(fromClientAction.clientPageLoadFailure(error)))
        ))
        )
    );

    clientSettingsLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientSettingsLoadRequest),
        switchMap(({id}) => this.clientService.loadClientSettings(id).pipe(
            map(payload =>  fromClientAction.clientSettingsLoadSuccess({payload})),
            catchError(error => of(fromClientAction.clientSettingsLoadFailure({payload: error.error})))
        ))
        )
    );

    clientSettingsUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientSettingsUpdateRequest),
        switchMap(({id, payload}) => this.clientService.updateClientSettings(id, payload).pipe(
            map(payload => fromClientAction.clientSettingsUpdateSuccess({payload})),
            catchError(error => of(fromClientAction.clientSettingsUpdateFailure(error)))
        ))
        )
    );

    tokenSettingsLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientTokenSettingsLoadRequest),
        switchMap(({id}) => this.clientService.loadClientTokenSettings(id).pipe(
            map(payload =>  fromClientAction.clientTokenSettingsLoadSuccess({payload})),
            catchError(error => of(fromClientAction.clientTokenSettingsLoadFailure({payload: error.error})))
        ))
        )
    );

    tokenSettingsUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientTokenSettingsUpdateRequest),
        switchMap(({id, payload}) => this.clientService.updateClientTokenSettings(id, payload).pipe(
            map(payload => fromClientAction.clientTokenSettingsUpdateSuccess({payload})),
            catchError(error => of(fromClientAction.clientTokenSettingsUpdateFailure(error)))
        ))
        )
    );

    clientScopesLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientScopesLoadRequest),
        switchMap(({id}) => this.clientService.loadClientScopes(id).pipe(
            map(payload =>  fromClientAction.clientScopesLoadSuccess({payload})),
            catchError(error => of(fromClientAction.clientScopesLoadFailure({payload: error.error})))
        ))
        )
    );

    clientScopesAdd$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientScopesAddRequest),
        switchMap(({id, payload}) => this.clientService.addClientScopes(id, payload).pipe(
            map(payload => fromClientAction.clientScopesAddSuccess({payload})),
            catchError(error => of(fromClientAction.clientScopesAddFailure(error)))
        ))
        )
    );

    clientScopesRemove$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientScopesRemoveRequest),
        switchMap(({clientId, scopeId}) => this.clientService.removeClientScopes(clientId, scopeId).pipe(
            map(payload => fromClientAction.clientScopesRemoveSuccess({payload})),
            catchError(error => of(fromClientAction.clientScopesRemoveFailure(error)))
        ))
        )
    );

    registerClient$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientRegisterRequest),
        switchMap(({payload}) => this.clientService.registerClient(payload).pipe(
            map(payload =>  fromClientAction.clientRegisterSuccess({payload})),
            catchError(error => of(fromClientAction.clientRegisterFailure(error)))
        ))
        )
    );

    deleteClient$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientAction.clientDeleteRequest),
        switchMap(({id}) => this.clientService.deleteClient(id).pipe(
            map(payload =>  fromClientAction.clientDeleteSuccess({payload})),
            catchError(error => of(fromClientAction.clientDeleteFailure(error)))
        ))
        )
    );
}
