import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SharedService } from "../services/shared.service";

import * as fromSharedTypes from '../types/_index';
import * as fromSharedAction from './shared.action';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { NotificationSnackbarComponent } from "../components/notification-snackbar/notification-snackbar.component";
import { NotificationSnackbarService } from "../services/notification-snackbar.service";


@Injectable()
export class SharedEffects {
    
    constructor(
        private actions$: Actions,
        private _snackBar: MatSnackBar, 
        private notificationSnackbarService: NotificationSnackbarService, 
        private sharedService: SharedService){}

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
