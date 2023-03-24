import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromScopeAction from '../store/scope.action' 
import { ScopeService } from "../services/scope.service";


@Injectable()
export class ScopeEffects {
    
    constructor(private actions$: Actions, private scopeService: ScopeService){}

    loadScopePage$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopePageLoadRequest),
        switchMap(({page, size}) => this.scopeService.loadScopePage(page, size).pipe(
            map(payload =>  fromScopeAction.scopePageLoadSuccess({payload})),
            catchError(error => of(fromScopeAction.scopePageLoadFailure({payload: error.error})))
        ))
        )
    );
    loadScopeSettings$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopeSettingsLoadRequest),
        switchMap(({id}) => this.scopeService.loadScopeSettings(id).pipe(
            map(payload =>  fromScopeAction.scopeSettingsLoadSuccess({payload})),
            catchError(error => of(fromScopeAction.scopeSettingsLoadFailure({payload: error.error})))
        ))
        )
    );
    loadScopeUsageByClients$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopeUsageByClientsLoadRequest),
        switchMap(({id}) => this.scopeService.loadScopeUsageByClients(id).pipe(
            map(payload =>  fromScopeAction.scopeUsageByClientsLoadSuccess({payload})),
            catchError(error => of(fromScopeAction.scopeUsageByClientsLoadFailure({payload: error.error})))
        ))
        )
    );
    registerScope$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopeRegisterRequest),
        switchMap(({payload}) => this.scopeService.registerScope(payload).pipe(
            map(payload =>  fromScopeAction.scopeRegisterSuccess({payload})),
            catchError(error => of(fromScopeAction.scopeRegisterFailure({payload: error.error})))
        ))
        )
    );
    updateScope$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopeSettingsUpdateRequest),
        switchMap(({id, payload}) => this.scopeService.updateScopeSettings(id, payload).pipe(
            map(payload =>  fromScopeAction.scopeSettingsUpdateSuccess({payload})),
            catchError(error => of(fromScopeAction.scopeSettingsUpdateFailure({payload: error.error})))
        ))
        )
    );

    deleteScope$ = createEffect(() => this.actions$.pipe(
        ofType(fromScopeAction.scopeDeleteRequest),
        switchMap(({id}) => this.scopeService.deleteScope(id).pipe(
            map(payload =>  fromScopeAction.scopeDeleteSuccess({payload})),
            catchError(error => of(fromScopeAction.scopeDeleteFailure({payload: error.error})))
        ))
        )
    );
    // updateClientSettingsSuccess = createEffect(() => this.actions$.pipe(
    //     ofType(fromClientCardAction.updateClientSettingsSuccess),
    //     tap(() => this.clientService.updateSuccess())),  { dispatch: false });
}
