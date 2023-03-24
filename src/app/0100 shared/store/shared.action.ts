import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'angular-oauth2-oidc';

import * as fromSharedTypes from '../types/_index'

export enum ActionType {
    NOTIFICATION_INFO = '[0100 Shared] notification | Info',
    NOTIFICATION_SUCCES = '[0100 Shared] notification | Success',
    NOTIFICATION_ERROR = '[0100 Shared] notification | Error',
}

export const notificationInfo = createAction(
    ActionType.NOTIFICATION_INFO,
    props<{ payload: fromSharedTypes.NotificationData }>()
);
export const notificationSuccess = createAction(
    ActionType.NOTIFICATION_SUCCES,
    props<{ payload: fromSharedTypes.NotificationData }>()
);
export const notificationError = createAction(
    ActionType.NOTIFICATION_ERROR,
    props<{ payload: fromSharedTypes.NotificationData }>()
);

