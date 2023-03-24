import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromAuthorityAction from './authority.action' 
import { AuthorityService } from "../services/authority.service";


@Injectable()
export class AuthorityEffects {
    
    constructor(private actions$: Actions, private authorityService: AuthorityService){}

    loadAuthorityPage$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authorityPageLoadRequest),
        switchMap(({page, size}) => this.authorityService.loadAuthorityPage(page,size).pipe(
            map(payload =>  fromAuthorityAction.authorityPageLoadSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authorityPageLoadFailure({payload: error.error})))
        ))
        )
    );
    loadAuthoritySettings$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authoritySettingsLoadRequest),
        switchMap(({authorityId}) => this.authorityService.loadAuthoritySettings(authorityId).pipe(
            map(payload =>  fromAuthorityAction.authoritySettingsLoadSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authoritySettingsLoadFailure({payload: error.error})))
        ))
        )
    );
    loadAuthorityUsageByUsers$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authorityUsageByUsersLoadRequest),
        switchMap(({authorityId}) => this.authorityService.loadAuthorityUsageByUsers(authorityId).pipe(
            map(payload =>  fromAuthorityAction.authorityUsageByUsersLoadSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authorityUsageByUsersLoadFailure({payload: error.error})))
        ))
        )
    );
    registerAuthority$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authorityRegisterRequest),
        switchMap(({payload}) => this.authorityService.registerAuthority(payload).pipe(
            map(payload =>  fromAuthorityAction.authorityRegisterSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authorityRegisterFailure({payload: error.error})))
        ))
        )
    );
    updateAuthoritySettings$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authoritySettingsUpdateRequest),
        switchMap(({authorityId, payload}) => this.authorityService.updateAuthoritySettings(authorityId, payload).pipe(
            map(payload =>  fromAuthorityAction.authoritySettingsUpdateSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authoritySettingsUpdateFailure({payload: error.error})))
        ))
        )
    );

    deleteAuthority$ = createEffect(() => this.actions$.pipe(
        ofType(fromAuthorityAction.authorityDeleteRequest),
        switchMap(({authorityId}) => this.authorityService.deleteAuthority(authorityId).pipe(
            map(payload =>  fromAuthorityAction.authorityDeleteSuccess({payload})),
            catchError(error => of(fromAuthorityAction.authorityDeleteFailure({payload: error.error})))
        ))
        )
    );
}
