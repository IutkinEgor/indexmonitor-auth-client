import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromRoleAction from './role.action' 
import { RoleService } from "../services/role.service";


@Injectable()
export class RoleEffects {
    
    constructor(private actions$: Actions, private roleService: RoleService){}

    loadRolePage$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.rolePageLoadRequest),
        switchMap(({page, size}) => this.roleService.loadRolePage(page,size).pipe(
            map(payload =>  fromRoleAction.rolePageLoadSuccess({payload})),
            catchError(error => of(fromRoleAction.rolePageLoadFailure({payload: error.error})))
        ))
        )
    );
    loadRoleSettings$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.roleSettingsLoadRequest),
        switchMap(({roleId}) => this.roleService.loadRoleSettings(roleId).pipe(
            map(payload =>  fromRoleAction.roleSettingsLoadSuccess({payload})),
            catchError(error => of(fromRoleAction.roleSettingsLoadFailure({payload: error.error})))
        ))
        )
    );
    loadRoleUsageByUsers$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.roleUsageByUsersLoadRequest),
        switchMap(({roleId}) => this.roleService.loadRoleUsageByUsers(roleId).pipe(
            map(payload =>  fromRoleAction.roleUsageByUsersLoadSuccess({payload})),
            catchError(error => of(fromRoleAction.roleUsageByUsersLoadFailure({payload: error.error})))
        ))
        )
    );
    registerRole$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.roleRegisterRequest),
        switchMap(({payload}) => this.roleService.registerRole(payload).pipe(
            map(payload =>  fromRoleAction.roleRegisterSuccess({payload})),
            catchError(error => of(fromRoleAction.roleRegisterFailure({payload: error.error})))
        ))
        )
    );
    updateRoleSettings$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.roleSettingsUpdateRequest),
        switchMap(({roleId, payload}) => this.roleService.updateRoleSettings(roleId, payload).pipe(
            map(payload =>  fromRoleAction.roleSettingsUpdateSuccess({payload})),
            catchError(error => of(fromRoleAction.roleSettingsUpdateFailure({payload: error.error})))
        ))
        )
    );

    deleteRole$ = createEffect(() => this.actions$.pipe(
        ofType(fromRoleAction.roleDeleteRequest),
        switchMap(({roleId}) => this.roleService.deleteRole(roleId).pipe(
            map(payload =>  fromRoleAction.roleDeleteSuccess({payload})),
            catchError(error => of(fromRoleAction.roleDeleteFailure({payload: error.error})))
        ))
        )
    );
    // updateClientSettingsSuccess = createEffect(() => this.actions$.pipe(
    //     ofType(fromClientCardAction.updateClientSettingsSuccess),
    //     tap(() => this.clientService.updateSuccess())),  { dispatch: false });
}
