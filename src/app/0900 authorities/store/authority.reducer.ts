
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromAuthorityTypes from '../types/_index';
import * as fromAuthorityAction from './authority.action';


export interface AuthoritySettingsState extends fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthoritySettingsInterface>{
    isLoading: boolean;
}

export interface AuthorityTableState extends fromSharedTypes.PageResponseInterface<fromAuthorityTypes.AuthorityPageInterface[]>{
    isLoading: boolean;
}

export interface AuthorityUsageByUsersState extends fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthorityUsageByUsersInterface[]>{
    isLoading: boolean;
}

export interface AuthorityState{
    authoritySettings: AuthoritySettingsState;
    authorityTable: AuthorityTableState;
    authorityUsageByUsers: AuthorityUsageByUsersState;
}

const initialState: AuthorityState = {
    authoritySettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    authorityTable: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: [],
        totalCount: null,
        currentPage: null,
        currentSize: null
    },
    authorityUsageByUsers: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: []
    }
}

const authorityReducer = createReducer(
    initialState, 
    //REGISTER
    on(fromAuthorityAction.authorityRegisterRequest, (state): AuthorityState => ({
        ...state
        })
    ),
    on(fromAuthorityAction.authorityRegisterSuccess, (state): AuthorityState => ({
        ...state
        })
    ),
    on(fromAuthorityAction.authorityRegisterFailure, (state): AuthorityState => ({
        ...state
        })
    ),
    //AUTHORITYTABLE
    on(fromAuthorityAction.authorityPageLoadRequest, (state): AuthorityState => ({
        ...state,
        authorityTable: {
            ...state.authorityTable,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: [],
            
        }
        })
    ),
    on(fromAuthorityAction.authorityPageLoadSuccess, (state, { payload }): AuthorityState => ({
        ...state,
        authorityTable: {
            ...state.authorityTable,
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
    on(fromAuthorityAction.authorityPageLoadFailure, (state, { payload }): AuthorityState => ({
        ...state,
        authorityTable: {
            ...state.authorityTable,
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
    //AUTHORITYSETTINGS
    on(fromAuthorityAction.authoritySettingsLoadRequest, (state): AuthorityState => ({
        ...state,
        authoritySettings: {
            ...state.authoritySettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromAuthorityAction.authoritySettingsLoadSuccess, (state, { payload }): AuthorityState => ({
        ...state,
        authoritySettings: {
            ...state.authoritySettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromAuthorityAction.authoritySettingsLoadFailure, (state, { payload }): AuthorityState => ({
        ...state,
        authoritySettings: {
            ...state.authoritySettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //AUTHORITYUSAGE BY Users
    on(fromAuthorityAction.authorityUsageByUsersLoadRequest, (state): AuthorityState => ({
        ...state,
        authorityUsageByUsers: {
            ...state.authorityUsageByUsers,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromAuthorityAction.authorityUsageByUsersLoadSuccess, (state, { payload }): AuthorityState => ({
        ...state,
        authorityUsageByUsers: {
            ...state.authorityUsageByUsers,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromAuthorityAction.authorityUsageByUsersLoadFailure, (state, { payload }): AuthorityState => ({
        ...state,
        authorityUsageByUsers: {
            ...state.authorityUsageByUsers,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //AUTHORITYSETTINGS UPDATE
    on(fromAuthorityAction.authoritySettingsUpdateRequest, (state, { authorityId, payload }): AuthorityState => ({
        ...state,
        })
    ),
    on(fromAuthorityAction.authoritySettingsUpdateSuccess, (state, { payload }): AuthorityState => ({
        ...state,
        })
    ),
    on(fromAuthorityAction.authoritySettingsUpdateFailure, (state, { payload }): AuthorityState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return authorityReducer(state, action);
}
export const authorityFeatureSelector = createFeatureSelector<AuthorityState>('authority');

export const isAuthorityTableLoading = (state: AuthorityState) => state.authorityTable.isLoading;
export const isAuthorityTableLoadedSuccess = (state: AuthorityState) => state.authorityTable.isSuccess;
export const isAuthorityTableLoadedFailure = (state: AuthorityState) => !state.authorityTable.isLoading  && !state.authorityTable.isSuccess;
export const getAuthorityTableData = (state: AuthorityState) => state.authorityTable.data;
export const getAuthorityTableMessage = (state: AuthorityState) => state.authorityTable.message;
export const getAuthorityTableTotalCount = (state: AuthorityState) => state.authorityTable.totalCount;
export const getAuthorityTableCurrentPage = (state: AuthorityState) => state.authorityTable.currentPage;
export const getAuthorityTableCurrentSize = (state: AuthorityState) => state.authorityTable.currentSize;

export const isAuthoritySettingsLoading = (state: AuthorityState) => state.authoritySettings.isLoading;
export const isAuthoritySettingsLoadedSuccess = (state: AuthorityState) => state.authoritySettings.isSuccess;
export const isAuthoritySettingsLoadedFailure = (state: AuthorityState) => !state.authoritySettings.isLoading  && !state.authoritySettings.isSuccess;
export const getAuthoritySettingsData = (state: AuthorityState) => state.authoritySettings.data;
export const getAuthoritySettingsMessage = (state: AuthorityState) => state.authoritySettings.message;

export const isAuthorityUsageByUsersLoading = (state: AuthorityState) => state.authorityUsageByUsers.isLoading;
export const isAuthorityUsageByUsersLoadedSuccess = (state: AuthorityState) => state.authorityUsageByUsers.isSuccess;
export const isAuthorityUsageByUsersLoadedFailure = (state: AuthorityState) => !state.authorityUsageByUsers.isLoading  && !state.authorityUsageByUsers.isSuccess;
export const getAuthorityUsageByUsersData = (state: AuthorityState) => state.authorityUsageByUsers.data;
export const getAuthorityUsageByUsersMessage = (state: AuthorityState) => state.authorityUsageByUsers.message;




