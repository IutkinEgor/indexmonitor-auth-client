
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromClientTypes from '../types/_index';
import * as fromClientAction from './client.action'

export interface ClientTableState extends fromSharedTypes.PageResponseInterface<fromClientTypes.ClientTableInterface[]>{
    isLoading: boolean;
}
export interface ClientSettingsState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientSettingsInterface>{
    isLoading: boolean;
}
export interface ClientTokenSettingsState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTokenSettingsInterface>{
    isLoading: boolean;
}
export interface ClientScopesState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientScopeInterface[]>{
    isLoading: boolean;
}
export interface ClientState {
    clientTable: ClientTableState;
    clientSettings: ClientSettingsState;
    tokenSettings: ClientTokenSettingsState;
    scopes: ClientScopesState;
}

const initialState: ClientState = {
    clientTable: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null,
        totalCount: null,
        currentPage: null,
        currentSize: null
    },
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

const clientReducer = createReducer(
    initialState, 
    on(fromClientAction.clientPageLoadRequest, (state): ClientState => ({
        ...state,
        clientTable: {
            ...state.clientTable,
        isLoading: true,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
        }
        })
    ),
    on(fromClientAction.clientPageLoadSuccess, (state, {payload}): ClientState => ({
        ...state,
        clientTable: {
            ...state.clientTable,
        isLoading: false,
        isSuccess: true,
        createdAt: payload.createdAt,
        message: null,
        data: payload.data,
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
        currentSize: payload.currentSize
        }
        })
    ),
    on(fromClientAction.clientPageLoadFailure, (state, {payload}): ClientState => ({
        ...state,
        clientTable: {
            ...state.clientTable,
        isLoading: false,
        isSuccess: false,
        createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
        message: payload == null || payload.message == null ? null : payload.message,
        data: null,
        totalCount: null,
        currentPage: null,
        currentSize: null
        }
        })
    ),
    on(fromClientAction.clientSettingsLoadRequest, (state , {id}): ClientState => ({
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
    on(fromClientAction.clientSettingsLoadSuccess, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientSettingsLoadFailure, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientSettingsUpdateRequest, (state, {id, payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientSettingsUpdateSuccess, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientSettingsUpdateFailure, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsLoadRequest, (state, {id}): ClientState => ({
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
    on(fromClientAction.clientTokenSettingsLoadSuccess, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientTokenSettingsLoadFailure, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientTokenSettingsUpdateRequest, (state, {id, payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsUpdateSuccess, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientTokenSettingsUpdateFailure, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesLoadRequest, (state, {id}): ClientState => ({
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
    on(fromClientAction.clientScopesLoadSuccess, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientScopesLoadFailure, (state, {payload}): ClientState => ({
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
    on(fromClientAction.clientScopesAddRequest, (state, {id, payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesAddSuccess, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesAddFailure, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveRequest, (state, {clientId, scopeId}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveSuccess, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientScopesRemoveFailure, (state, {payload}): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientRegisterRequest, (state): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientRegisterSuccess, (state): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientRegisterFailure, (state): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientDeleteRequest, (state): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientDeleteSuccess, (state): ClientState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientDeleteFailure, (state): ClientState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return clientReducer(state, action);
}
export const clientFeatureSelector = createFeatureSelector<ClientState>('client');

export const isClientPageLoading = (state: ClientState) => state.clientTable.isLoading;
export const isClientPageSuccess = (state: ClientState) => state.clientTable.isSuccess;
export const isClientPageFailure = (state: ClientState) => !state.clientTable.isLoading  && !state.clientTable.isSuccess;
export const getClientPageData = (state: ClientState) => state.clientTable.data;
export const getClientPageMessage = (state: ClientState) => state.clientTable.message;
export const getClientPageTotalCount = (state: ClientState) => state.clientTable.totalCount;
export const getClientPageCurrentPage = (state: ClientState) => state.clientTable.currentPage;
export const getClientPageCurrentSize = (state: ClientState) => state.clientTable.currentSize;

export const isClientSettingsLoading = (state: ClientState) => state.clientSettings.isLoading;
export const isClientSettingsLoadedSuccess = (state: ClientState) => state.clientSettings.isSuccess;
export const isClientSettingsLoadedFailure = (state: ClientState) => !state.clientSettings.isLoading  && !state.clientSettings.isSuccess;
export const getClientSettingsData = (state: ClientState) => state.clientSettings.data;
export const getClientSettingsMessage = (state: ClientState) => state.clientSettings.message;

export const isTokenSettingsLoading = (state: ClientState) => state.tokenSettings.isLoading;
export const isTokenSettingsLoadedSuccess = (state: ClientState) => state.tokenSettings.isSuccess;
export const isTokenSettingsLoadedFailure = (state: ClientState) => !state.tokenSettings.isLoading  && !state.tokenSettings.isSuccess;
export const getTokenSettingsData = (state: ClientState) => state.tokenSettings.data;
export const getTokenSettingsMessage = (state: ClientState) => state.tokenSettings.message;

export const isScopesLoading = (state: ClientState) => state.scopes.isLoading;
export const isScopesLoadedSuccess = (state: ClientState) => state.scopes.isSuccess;
export const isScopesLoadedFailure = (state: ClientState) => !state.scopes.isLoading  && !state.scopes.isSuccess;
export const getScopesData = (state: ClientState) => state.scopes.data;
export const getScopesMessage = (state: ClientState) => state.scopes.message;



