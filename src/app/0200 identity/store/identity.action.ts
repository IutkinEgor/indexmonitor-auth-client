import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'angular-oauth2-oidc';
import { AuthenticationRequestInterface } from '../types/authentication-request.interface';

export enum ActionType {
    AUTHENTICATION_REQUEST = '[200 Identity] authentication request',
    AUTHENTICATION_SUCCESS = '[200 Identity] authentication success',
    AUTHENTICATION_FAILURE = '[200 Identity] authentication failure',
    LOGOUT_REQUEST = '[200 Identity] logout request',
    //OAuth 2.0
    TRY_LOGIN = '[200 Identity] try login',
    DISCOVERY_DOCUMENT_LOADED = '[200 Identity] discovery document loaded',
    DISCOVERY_DOCUMENT_LOAD_ERROR = '[200 Identity] discovery document load error',
    DISCOVERY_DOCUMENT_VALIDATION_ERROR = '[200 Identity] discovery document validation error',
    USER_PROFILE_LOADED = '[200 Identity] user profile loaded',
    USER_PROFILE_LOAD_ERROR = '[200 Identity] user profile load error',
    JWKS_LOAD_ERROR = '[200 Identity] jwks load error',
    INVALID_NONCE_IN_STATE = '[200 Identity] invalid nonce in state',
    CODE_ERROR = '[200 Identity] code error',
    TOKEN_RECEIVED = '[200 Identity] token received',
    TOKEN_ERROR = '[200 Identity] token error',
    TOKEN_REFRESHED = '[200 Identity] token refreshed',
    TOKEN_REFRESH_ERROR = '[200 Identity] token refresh error',
    TOKEN_VALIDATION_ERROR = '[200 Identity] token validation error',
    TOKEN_EXPIRES = '[200 Identity] token expires',
    SILENTLY_REFRESHED = '[200 Identity] silently refreshed',
    SILENT_REFRESH_ERROR = '[200 Identity] silent refresh error',
    SILENT_REFRESH_TIMEOUT = '[200 Identity] silent refresh timeout',
    SESSION_CHANGED = '[200 Identity] session changed',
    SESSION_ERROR = '[200 Identity] session error',
    SESSION_TERMINATED = '[200 Identity] session terminated',
    SESSION_UNCHANGED = '[200 Identity] session unchanged',
    LOGOUT = '[200 Identity] logout',
    POPUP_CLOSED = '[200 Identity] popup closed',
    POPUP_BLOCKED = '[200 Identity] popup blocked',
    TOKEN_REVOKE_ERROR = '[200 Identity] token revoke error',
}
export const authenticationRequest = createAction(
    ActionType.AUTHENTICATION_REQUEST, 
    props<{ payload: AuthenticationRequestInterface }>() //AuthenticationRequestInterface
);
export const authenticationSuccess = createAction(
    ActionType.AUTHENTICATION_SUCCESS
);
export const authenticationFailure = createAction(
    ActionType.AUTHENTICATION_FAILURE
);
export const logoutRequest = createAction(
    ActionType.LOGOUT_REQUEST
);
//OAuth 2.0 Event handling
export const tryLogin = createAction(
    ActionType.TRY_LOGIN
);
export const discoveryDocumentLoaded = createAction(
    ActionType.DISCOVERY_DOCUMENT_LOADED
);
export const discoveryDocumentLoadedError = createAction(
    ActionType.DISCOVERY_DOCUMENT_LOAD_ERROR
);
export const discoveryDocumentValidationError = createAction(
    ActionType.DISCOVERY_DOCUMENT_VALIDATION_ERROR
);
export const userProfileLoaded = createAction(
    ActionType.USER_PROFILE_LOADED, 
    props<{ payload: UserInfo }>()
);
export const userProfileLoadedError = createAction(
    ActionType.USER_PROFILE_LOAD_ERROR
);
export const jwksLoadError = createAction(
    ActionType.JWKS_LOAD_ERROR
);
export const invalidNonceInState = createAction(
    ActionType.INVALID_NONCE_IN_STATE
);
export const codeError = createAction(
    ActionType.CODE_ERROR
);
export const tokenReceived = createAction(
    ActionType.TOKEN_RECEIVED
);
export const tokenError = createAction(
    ActionType.TOKEN_ERROR
);
export const tokenRefreshed = createAction(
    ActionType.TOKEN_REFRESHED
);
export const tokenRefreshError = createAction(
    ActionType.TOKEN_REFRESH_ERROR
);
export const tokenValidationError = createAction(
    ActionType.TOKEN_VALIDATION_ERROR
);
export const tokenExpires = createAction(
    ActionType.TOKEN_EXPIRES
);
export const silentyRefreshed = createAction(
    ActionType.SILENTLY_REFRESHED, 
);
export const silentRefreshError = createAction(
    ActionType.SILENT_REFRESH_ERROR
);
export const silentRefreshTimeout = createAction(
    ActionType.SILENT_REFRESH_TIMEOUT
);
export const sessionChanged = createAction(
    ActionType.SESSION_CHANGED, 
);
export const sessionError = createAction(
    ActionType.SESSION_ERROR
);
export const sessionTerminated = createAction(
    ActionType.SESSION_TERMINATED, 
);
export const sessionUnchanged = createAction(
    ActionType.SESSION_UNCHANGED
);
export const logout = createAction(
    ActionType.LOGOUT
);
export const popupClosed = createAction(
    ActionType.POPUP_CLOSED
);
export const popupBlocked = createAction(
    ActionType.POPUP_BLOCKED
);
export const tokenRevokeError = createAction(
    ActionType.TOKEN_REVOKE_ERROR
);
