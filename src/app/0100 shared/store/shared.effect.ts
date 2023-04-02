import { Injectable } from "@angular/core";;
import { tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationSnackbarService } from "../services/notification-snackbar.service";

import * as fromSharedAction from './shared.action';

@Injectable()
export class SharedEffects {
    
    constructor(
        private actions$: Actions,
        private _snackBar: MatSnackBar, 
        private notificationSnackbarService: NotificationSnackbarService){}

    notificationInfo$ = createEffect(() => this.actions$.pipe(
        ofType(fromSharedAction.notificationInfo),
        tap(({payload}) => this.notificationSnackbarService.info(payload))),{ dispatch: false });

    notificationSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromSharedAction.notificationSuccess),
        tap(({payload}) => this.notificationSnackbarService.success(payload))),{ dispatch: false });

    notificationError$ = createEffect(() => this.actions$.pipe(
        ofType(fromSharedAction.notificationError),
        tap(({payload}) => this.notificationSnackbarService.error(payload))),{ dispatch: false });
}
