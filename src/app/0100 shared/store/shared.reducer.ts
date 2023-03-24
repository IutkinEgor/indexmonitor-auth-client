import { state } from "@angular/animations";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { UserInfo } from "angular-oauth2-oidc";
import { combineLatest } from "rxjs";

import * as fromSharedTypes from '../types/_index'
import * as fromNotificationAction from './shared.action'

export interface SharedState {
}

const initialState: SharedState = {
}

const SharedReducer = createReducer(
    initialState, 
    on(fromNotificationAction.notificationInfo, (state, {payload}): SharedState => ({
        ...state,
        })
    ),
    on(fromNotificationAction.notificationSuccess, (state, {payload}): SharedState => ({
        ...state,
        })
    ),
    on(fromNotificationAction.notificationError, (state, {payload}): SharedState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return SharedReducer(state, action);
}

export const sharedFeatureSelector = createFeatureSelector<
    SharedState
    >('shared');

    

//export const getNotification = (state: SharedState) => state.notification;

