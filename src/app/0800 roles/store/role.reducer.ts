
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromroleTypes from '../types/_index';
import * as fromroleAction from './role.action';


export interface RoleSettingsState extends fromSharedTypes.BaseResponseInterface<fromroleTypes.RoleSettingsInterface>{
    isLoading: boolean;
}

export interface RoleTableState extends fromSharedTypes.PageResponseInterface<fromroleTypes.RolePageInterface[]>{
    isLoading: boolean;
}

export interface RoleUsageByUsersState extends fromSharedTypes.BaseResponseInterface<fromroleTypes.RoleUsageByUsersInterface[]>{
    isLoading: boolean;
}

export interface RoleState{
    roleSettings: RoleSettingsState;
    roleTable: RoleTableState;
    roleUsageByUsers: RoleUsageByUsersState;
}

const initialState: RoleState = {
    roleSettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    roleTable: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null,
        totalCount: null,
        currentPage: null,
        currentSize: null
    },
    roleUsageByUsers: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: []
    }
}

const roleReducer = createReducer(
    initialState, 
    //REGISTER
    on(fromroleAction.roleRegisterRequest, (state): RoleState => ({
        ...state
        })
    ),
    on(fromroleAction.roleRegisterSuccess, (state): RoleState => ({
        ...state
        })
    ),
    on(fromroleAction.roleRegisterFailure, (state): RoleState => ({
        ...state
        })
    ),
    //role TABLE
    on(fromroleAction.rolePageLoadRequest, (state): RoleState => ({
        ...state,
        roleTable: {
            ...state.roleTable,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: [],
        }
        })
    ),
    on(fromroleAction.rolePageLoadSuccess, (state, { payload }): RoleState => ({
        ...state,
        roleTable: {
            ...state.roleTable,
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
    on(fromroleAction.rolePageLoadFailure, (state, { payload }): RoleState => ({
        ...state,
        roleTable: {
            ...state.roleTable,
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
    //role SETTINGS
    on(fromroleAction.roleSettingsLoadRequest, (state): RoleState => ({
        ...state,
        roleSettings: {
            ...state.roleSettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromroleAction.roleSettingsLoadSuccess, (state, { payload }): RoleState => ({
        ...state,
        roleSettings: {
            ...state.roleSettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromroleAction.roleSettingsLoadFailure, (state, { payload }): RoleState => ({
        ...state,
        roleSettings: {
            ...state.roleSettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //role USAGE BY Users
    on(fromroleAction.roleUsageByUsersLoadRequest, (state): RoleState => ({
        ...state,
        roleUsageByUsers: {
            ...state.roleUsageByUsers,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromroleAction.roleUsageByUsersLoadSuccess, (state, { payload }): RoleState => ({
        ...state,
        roleUsageByUsers: {
            ...state.roleUsageByUsers,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromroleAction.roleUsageByUsersLoadFailure, (state, { payload }): RoleState => ({
        ...state,
        roleUsageByUsers: {
            ...state.roleUsageByUsers,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    //ROLE SETTINGS UPDATE
    on(fromroleAction.roleSettingsUpdateRequest, (state, { roleId, payload }): RoleState => ({
        ...state,
        })
    ),
    on(fromroleAction.roleSettingsUpdateSuccess, (state, { payload }): RoleState => ({
        ...state,
        })
    ),
    on(fromroleAction.roleSettingsUpdateFailure, (state, { payload }): RoleState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return roleReducer(state, action);
}
export const roleFeatureSelector = createFeatureSelector<RoleState>('role');

export const isRoleTableLoading = (state: RoleState) => state.roleTable.isLoading;
export const isRoleTableLoadedSuccess = (state: RoleState) => state.roleTable.isSuccess;
export const isRoleTableLoadedFailure = (state: RoleState) => !state.roleTable.isLoading  && !state.roleTable.isSuccess;
export const getRoleTableData = (state: RoleState) => state.roleTable.data;
export const getRoleTableMessage = (state: RoleState) => state.roleTable.message;
export const getRoleTableTotalCount = (state: RoleState) => state.roleTable.totalCount;
export const getRoleTableCurrentPage = (state: RoleState) => state.roleTable.currentPage;
export const getRoleTableCurrentSize = (state: RoleState) => state.roleTable.currentSize;

export const isRoleSettingsLoading = (state: RoleState) => state.roleSettings.isLoading;
export const isRoleSettingsLoadedSuccess = (state: RoleState) => state.roleSettings.isSuccess;
export const isRoleSettingsLoadedFailure = (state: RoleState) => !state.roleSettings.isLoading  && !state.roleSettings.isSuccess;
export const getRoleSettingsData = (state: RoleState) => state.roleSettings.data;
export const getRoleSettingsMessage = (state: RoleState) => state.roleSettings.message;

export const isRoleUsageByUsersLoading = (state: RoleState) => state.roleUsageByUsers.isLoading;
export const isRoleUsageByUsersLoadedSuccess = (state: RoleState) => state.roleUsageByUsers.isSuccess;
export const isRoleUsageByUsersLoadedFailure = (state: RoleState) => !state.roleUsageByUsers.isLoading  && !state.roleUsageByUsers.isSuccess;
export const getRoleUsageByUsersData = (state: RoleState) => state.roleUsageByUsers.data;
export const getRoleUsageByUsersMessage = (state: RoleState) => state.roleUsageByUsers.message;




