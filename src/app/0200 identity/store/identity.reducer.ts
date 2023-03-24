import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { UserInfo } from "angular-oauth2-oidc";

import * as fromIdentityAction from './identity.action'

export interface IdentityState {
    isLoading: boolean;
    isAuthenticated: boolean;
    userInfo: UserInfo
}

const initialState: IdentityState = {
    isLoading: false,
    isAuthenticated: false,
    userInfo: { sub: '' }
}

const identityReducer = createReducer(
    initialState, 
    on(fromIdentityAction.authenticationRequest, (state): IdentityState => ({
        ...state,
        isLoading: true
        })
    ),
    on(fromIdentityAction.authenticationSuccess, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: true
        })
    ),
    on(fromIdentityAction.authenticationFailure, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: false
        })
    ),
    on(fromIdentityAction.logout, (state): IdentityState => ({
        ...state })
    ),
    on(fromIdentityAction.tryLogin, (state): IdentityState => ({
        ...state,
        isLoading: true
        })
    ),
    on(fromIdentityAction.tokenReceived, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: true
        })
    ),
    on(fromIdentityAction.tokenError, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: false
        })
    ),
    on(fromIdentityAction.tokenExpires, (state): IdentityState => ({
        ...state,
        isLoading: true,
        isAuthenticated: true
        })
    ),
    on(fromIdentityAction.tokenRefreshed, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: true
        })
    ),
    on(fromIdentityAction.tokenRefreshError, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: false
        })
    ),
    on(fromIdentityAction.userProfileLoaded, (state, { payload }): IdentityState => ({
        ...state,
        userInfo: payload
        })
    ),
    on(fromIdentityAction.userProfileLoadedError, (state): IdentityState => ({
        ...state,
        userInfo: { sub: '' }
        })
    ),
    on(fromIdentityAction.logout, (state): IdentityState => ({
        ...state,
        isLoading: false,
        isAuthenticated: false,
        userInfo: { sub: '' }
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return identityReducer(state, action);
}
export const identityFeatureSelector = createFeatureSelector<IdentityState>('identity');

export const isLoading = (state: IdentityState) => state.isLoading;
export const isAuthenticated = (state: IdentityState) => state.isAuthenticated;
export const canActivate = (state: IdentityState) => (state.isAuthenticated && !state.isLoading);
export const getUserInfo = (state: IdentityState) => state.userInfo;



