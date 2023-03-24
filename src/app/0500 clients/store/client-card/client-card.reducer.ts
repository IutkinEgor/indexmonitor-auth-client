
import { Action, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../types/_index';
import * as fromClientAction from './client-card.action'


export interface ClientSettingsState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientSettingsInterface>{
    isLoading: boolean;
}
export interface ClientTokenSettingsState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTokenSettingsInterface>{
    isLoading: boolean;
}
export interface ClientScopesState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientScopeInterface[]>{
    isLoading: boolean;
}
export interface ClientCardState {
    clientSettings: ClientSettingsState;
    tokenSettings: ClientTokenSettingsState;
    scopes: ClientScopesState;
}

const initialState: ClientCardState = {
    clientSettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    tokenSettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    scopes: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
}

const ClientCardReducer = createReducer(
    initialState, 
    on(fromClientAction.clientSettingsLoadRequest, (state , {id}): ClientCardState => ({
        ...state,
        clientSettings: {
            ...state.clientSettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromClientAction.clientSettingsLoadSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        clientSettings: {
            ...state.clientSettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromClientAction.clientSettingsLoadFailure, (state, {payload}): ClientCardState => ({
        ...state,
        clientSettings: {
            ...state.clientSettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromClientAction.clientSettingsUpdateRequest, (state, {id, payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientSettingsUpdateSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientSettingsUpdateFailure, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsLoadRequest, (state, {id}): ClientCardState => ({
        ...state,
        tokenSettings: {
            ...state.tokenSettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromClientAction.clientTokenSettingsLoadSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        tokenSettings: {
            ...state.tokenSettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromClientAction.clientTokenSettingsLoadFailure, (state, {payload}): ClientCardState => ({
        ...state,
        tokenSettings: {
            ...state.tokenSettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromClientAction.clientTokenSettingsUpdateRequest, (state, {id, payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsUpdateSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsUpdateFailure, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesLoadRequest, (state, {id}): ClientCardState => ({
        ...state,
        scopes: {
            ...state.scopes,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromClientAction.clientScopesLoadSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        scopes: {
            ...state.scopes,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromClientAction.clientScopesLoadFailure, (state, {payload}): ClientCardState => ({
        ...state,
        scopes: {
            ...state.scopes,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromClientAction.clientScopesAddRequest, (state, {id, payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesAddSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesAddFailure, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveRequest, (state, {clientId, scopeId}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveSuccess, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveFailure, (state, {payload}): ClientCardState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return ClientCardReducer(state, action);
}

export const isClientSettingsLoading = (state: ClientCardState) => state.clientSettings.isLoading;
export const isClientSettingsLoadedSuccess = (state: ClientCardState) => state.clientSettings.isSuccess;
export const isClientSettingsLoadedFailure = (state: ClientCardState) => !state.clientSettings.isLoading  && !state.clientSettings.isSuccess;
export const getClientSettingsData = (state: ClientCardState) => state.clientSettings.data;
export const getClientSettingsMessage = (state: ClientCardState) => state.clientSettings.message;

export const isTokenSettingsLoading = (state: ClientCardState) => state.tokenSettings.isLoading;
export const isTokenSettingsLoadedSuccess = (state: ClientCardState) => state.tokenSettings.isSuccess;
export const isTokenSettingsLoadedFailure = (state: ClientCardState) => !state.tokenSettings.isLoading  && !state.tokenSettings.isSuccess;
export const getTokenSettingsData = (state: ClientCardState) => state.tokenSettings.data;
export const getTokenSettingsMessage = (state: ClientCardState) => state.tokenSettings.message;

export const isScopesLoading = (state: ClientCardState) => state.scopes.isLoading;
export const isScopesLoadedSuccess = (state: ClientCardState) => state.scopes.isSuccess;
export const isScopesLoadedFailure = (state: ClientCardState) => !state.scopes.isLoading  && !state.scopes.isSuccess;
export const getScopesData = (state: ClientCardState) => state.scopes.data;
export const getScopesMessage = (state: ClientCardState) => state.scopes.message;



