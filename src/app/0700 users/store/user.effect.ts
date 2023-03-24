import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";

import * as fromUserAction from './user.action'; 


@Injectable()
export class UserEffects {
    
    constructor(private actions$: Actions, private userService: UserService){}

    userTableLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userPageLoadRequest),
        switchMap(({page, size}) => this.userService.loadUserPage(page, size).pipe(
            map(payload =>  fromUserAction.userPageLoadSuccess({payload})),
            catchError(error => of(fromUserAction.userPageLoadFailure({payload: error.error})))
        ))
        )
    );

    userSettingsLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userSettingsLoadRequest),
        switchMap(({userId}) => this.userService.loadUserSettings(userId).pipe(
            map(payload =>  fromUserAction.userSettingsLoadSuccess({payload})),
            catchError(error => of(fromUserAction.userSettingsLoadFailure({payload: error.error})))
        ))
        )
    );

    userPofileLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userProfileLoadRequest),
        switchMap(({userId}) => this.userService.loadUserProfile(userId).pipe(
            map(payload =>  fromUserAction.userProfileLoadSuccess({payload})),
            catchError(error => of(fromUserAction.userProfileLoadFailure({payload: error.error})))
        ))
        )
    );

    userRolesLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userRolesLoadRequest),
        switchMap(({userId}) => this.userService.loadUserRoles(userId).pipe(
            map(payload =>  fromUserAction.userRolesLoadSuccess({payload})),
            catchError(error => of(fromUserAction.userRolesLoadFailure({payload: error.error})))
        ))
        )
    );
    userRolesAdd$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userRolesAddRequest),
        switchMap(({userId, roleIds}) => this.userService.addUserRoles(userId,roleIds).pipe(
            map(payload =>  fromUserAction.userRolesAddSuccess({payload})),
            catchError(error => of(fromUserAction.userRolesAddFailure({payload: error.error})))
        ))
        )
    );
    userRolesRemove$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userRolesRemoveRequest),
        switchMap(({userId, roleId}) => this.userService.removeUserRoles(userId,roleId).pipe(
            map(payload =>  fromUserAction.userRolesRemoveSuccess({payload})),
            catchError(error => of(fromUserAction.userRolesRemoveFailure({payload: error.error})))
        ))
        )
    );
    userAuthoritiesLoad$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userAuthoritiesLoadRequest),
        switchMap(({userId}) => this.userService.loadUserAuthorities(userId).pipe(
            map(payload =>  fromUserAction.userAuthoritiesLoadSuccess({payload})),
            catchError(error => of(fromUserAction.userAuthoritiesLoadFailure({payload: error.error})))
        ))
        )
    );
    userAuthoritiesAdd$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userAuthoritiesAddRequest),
        switchMap(({userId, authorityIds}) => this.userService.addUserAuthorities(userId,authorityIds).pipe(
            map(payload =>  fromUserAction.userAuthoritiesAddSuccess({payload})),
            catchError(error => of(fromUserAction.userAuthoritiesAddFailure({payload: error.error})))
        ))
        )
    );
    userAuthoritiesRemove$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userAuthoritiesRemoveRequest),
        switchMap(({userId, authorityId}) => this.userService.removeUserAuthorities(userId,authorityId).pipe(
            map(payload =>  fromUserAction.userAuthoritiesRemoveSuccess({payload})),
            catchError(error => of(fromUserAction.userAuthoritiesRemoveFailure({payload: error.error})))
        ))
        )
    );
    userRegister$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userRegisterRequest),
        switchMap(({payload}) => this.userService.registerUser(payload).pipe(
            map(payload =>  fromUserAction.userRegisterSuccess({payload})),
            catchError(error => of(fromUserAction.userRegisterFailure({payload: error.error})))
        ))
        )
    );
    userDelete$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserAction.userDeleteRequest),
        switchMap(({userId}) => this.userService.deleteUser(userId).pipe(
            map(payload =>  fromUserAction.userDeleteSuccess({payload})),
            catchError(error => of(fromUserAction.userDeleteFailure({payload: error.error})))
        ))
        )
    );
}
