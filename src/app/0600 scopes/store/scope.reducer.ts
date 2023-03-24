
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromScopeTypes from '../types/_index';
import * as fromScopeAction from '../store/scope.action';


export interface ScopeSettingsState extends fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeSettingsInterface>{
    isLoading: boolean;
}

export interface ScopeTableState extends fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopePageInterface[]>{
    isLoading: boolean;
}

export interface ScopeUsageByClientState extends fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeUsageByClientInterface[]>{
    isLoading: boolean;
}

export interface ScopeState{
    scopeSettings: ScopeSettingsState;
    scopeTable: ScopeTableState;
    scopeUsageByClient: ScopeUsageByClientState;
}

const initialState: ScopeState = {
    scopeSettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    scopeTable: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: []
    },
    scopeUsageByClient: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: []
    }
}

const ScopeReducer = createReducer(
    initialState, 
    //REGISTER
    on(fromScopeAction.scopeRegisterRequest, (state): ScopeState => ({
        ...state
        })
    ),
    on(fromScopeAction.scopeRegisterSuccess, (state): ScopeState => ({
        ...state
        })
    ),
    on(fromScopeAction.scopeRegisterFailure, (state): ScopeState => ({
        ...state
        })
    ),
    //SCOPE TABLE
    on(fromScopeAction.scopePageLoadRequest, (state): ScopeState => ({
        ...state,
        scopeTable: {
            ...state.scopeTable,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: []
        }
        })
    ),
    on(fromScopeAction.scopePageLoadSuccess, (state, { payload }): ScopeState => ({
        ...state,
        scopeTable: {
            ...state.scopeTable,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromScopeAction.scopePageLoadFailure, (state, { payload }): ScopeState => ({
        ...state,
        scopeTable: {
            ...state.scopeTable,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //SCOPE SETTINGS
    on(fromScopeAction.scopeSettingsLoadRequest, (state): ScopeState => ({
        ...state,
        scopeSettings: {
            ...state.scopeSettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromScopeAction.scopeSettingsLoadSuccess, (state, { payload }): ScopeState => ({
        ...state,
        scopeSettings: {
            ...state.scopeSettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromScopeAction.scopeSettingsLoadFailure, (state, { payload }): ScopeState => ({
        ...state,
        scopeSettings: {
            ...state.scopeSettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //SCOPE USAGE BY CLIENT
    on(fromScopeAction.scopeUsageByClientsLoadRequest, (state): ScopeState => ({
        ...state,
        scopeUsageByClient: {
            ...state.scopeUsageByClient,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromScopeAction.scopeUsageByClientsLoadSuccess, (state, { payload }): ScopeState => ({
        ...state,
        scopeUsageByClient: {
            ...state.scopeUsageByClient,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromScopeAction.scopeUsageByClientsLoadFailure, (state, { payload }): ScopeState => ({
        ...state,
        scopeUsageByClient: {
            ...state.scopeUsageByClient,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //SCOPE SETTINGS
    on(fromScopeAction.scopeSettingsUpdateRequest, (state, { id, payload }): ScopeState => ({
        ...state,
        })
    ),
    on(fromScopeAction.scopeSettingsUpdateSuccess, (state, { payload }): ScopeState => ({
        ...state,
        })
    ),
    on(fromScopeAction.scopeSettingsUpdateFailure, (state, { payload }): ScopeState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return ScopeReducer(state, action);
}
export const scopeFeatureSelector = createFeatureSelector<ScopeState>('scope');

export const isTableLoading = (state: ScopeState) => state.scopeTable.isLoading;
export const isTableLoadedSuccess = (state: ScopeState) => state.scopeTable.isSuccess;
export const isTableLoadedFailure = (state: ScopeState) => !state.scopeTable.isLoading  && !state.scopeTable.isSuccess;
export const getTableData = (state: ScopeState) => state.scopeTable.data;
export const getTableMessage = (state: ScopeState) => state.scopeTable.message;

export const isSettingsLoading = (state: ScopeState) => state.scopeSettings.isLoading;
export const isSettingsLoadedSuccess = (state: ScopeState) => state.scopeSettings.isSuccess;
export const isSettingsLoadedFailure = (state: ScopeState) => !state.scopeSettings.isLoading  && !state.scopeSettings.isSuccess;
export const getSettingsData = (state: ScopeState) => state.scopeSettings.data;
export const getSettingsMessage = (state: ScopeState) => state.scopeSettings.message;

export const isUsageByClientLoading = (state: ScopeState) => state.scopeUsageByClient.isLoading;
export const isUsageByClientLoadedSuccess = (state: ScopeState) => state.scopeUsageByClient.isSuccess;
export const isUsageByClientLoadedFailure = (state: ScopeState) => !state.scopeUsageByClient.isLoading  && !state.scopeUsageByClient.isSuccess;
export const getUsageByClientData = (state: ScopeState) => state.scopeUsageByClient.data;
export const getUsageByClientMessage = (state: ScopeState) => state.scopeUsageByClient.message;




