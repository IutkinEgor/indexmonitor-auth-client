
import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromUserTypes from '../types/_index';
import * as fromUserAction from './user.action'

export interface UserTablePageState extends fromSharedTypes.PageResponseInterface<fromUserTypes.UserPageInterface[]>{
    isLoading: boolean;
}
export interface UserSettingsState extends fromSharedTypes.BaseResponseInterface<fromUserTypes.UserSettingsInterface>{
    isLoading: boolean;
}
export interface UserProfileState extends fromSharedTypes.BaseResponseInterface<fromUserTypes.UserProfileInterface>{
    isLoading: boolean;
}
export interface UserRolesState extends fromSharedTypes.BaseResponseInterface<fromUserTypes.UserRoleInterface[]>{
    isLoading: boolean;
}
export interface UserAuthoritiesState extends fromSharedTypes.BaseResponseInterface<fromUserTypes.UserAuthorityInterface[]>{
    isLoading: boolean;
}
export interface UserState {
    tablePage: UserTablePageState;
    userSettings: UserSettingsState;
    userProfile: UserProfileState;
    userRoles: UserRolesState;
    userAuthorities: UserAuthoritiesState;
}

const initialState: UserState = {
    tablePage: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null,
        totalCount: null,
        currentPage: null,
        currentSize: null
    },
    userSettings: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    userProfile: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    userRoles: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
    userAuthorities: {
        isLoading: false,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
    },
}

const UserReducer = createReducer(
    initialState, 
    //USER TABLE PAGE
    on(fromUserAction.userPageLoadRequest, (state): UserState => ({
        ...state,
        tablePage: {
            ...state.tablePage,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromUserAction.userPageLoadSuccess, (state, {payload}): UserState => ({
        ...state,
        tablePage: {
            ...state.tablePage,
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
    on(fromUserAction.userPageLoadFailure, (state, {payload}): UserState => ({
        ...state,
        tablePage: {
            ...state.tablePage,
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
    //USER REGISTER
    on(fromUserAction.userRegisterRequest, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRegisterSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRegisterFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    //USER SETTINGS
    on(fromUserAction.userSettingsLoadRequest, (state, {userId}): UserState => ({
        ...state,
        userSettings: {
            ...state.userSettings,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromUserAction.userSettingsLoadSuccess, (state, {payload}): UserState => ({
        ...state,
        userSettings: {
            ...state.userSettings,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromUserAction.userSettingsLoadFailure, (state, {payload}): UserState => ({
        ...state,
        userSettings: {
            ...state.userSettings,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromUserAction.userSettingsUpdateRequest, (state, {userId, payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userSettingsUpdateSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userSettingsUpdateFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    //USER DELETE
    on(fromUserAction.userDeleteRequest, (state, {userId }): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userDeleteSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userDeleteFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    //USER PROFILE
    on(fromUserAction.userProfileLoadRequest, (state, {userId}): UserState => ({
        ...state,
        userProfile: {
            ...state.userProfile,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromUserAction.userProfileLoadSuccess, (state, {payload}): UserState => ({
        ...state,
        userProfile: {
            ...state.userProfile,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromUserAction.userProfileLoadFailure, (state, {payload}): UserState => ({
        ...state,
        userProfile: {
            ...state.userProfile,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromUserAction.userProfileUpdateRequest, (state, {userId, payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userProfileUpdateSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userProfileUpdateFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    //USER ROLES
    on(fromUserAction.userRolesLoadRequest, (state, {userId}): UserState => ({
        ...state,
        userRoles: {
            ...state.userRoles,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromUserAction.userRolesLoadSuccess, (state, {payload}): UserState => ({
        ...state,
        userRoles: {
            ...state.userRoles,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromUserAction.userRolesLoadFailure, (state, {payload}): UserState => ({
        ...state,
        userRoles: {
            ...state.userRoles,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromUserAction.userRolesAddRequest, (state, {userId, roleIds}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRolesAddSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRolesAddFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRolesRemoveRequest, (state, {userId, roleId}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRolesRemoveSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userRolesRemoveFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    //USER AUTHORITIES
    on(fromUserAction.userAuthoritiesLoadRequest, (state, {userId}): UserState => ({
        ...state,
        userAuthorities: {
            ...state.userAuthorities,
            isLoading: true,
            isSuccess: false,
            createdAt: null,
            message: null,
            data: null
        }
        })
    ),
    on(fromUserAction.userAuthoritiesLoadSuccess, (state, {payload}): UserState => ({
        ...state,
        userAuthorities: {
            ...state.userAuthorities,
            isLoading: false,
            isSuccess: true,
            createdAt: payload.createdAt,
            message: null,
            data: payload.data
        }
        })
    ),
    on(fromUserAction.userAuthoritiesLoadFailure, (state, {payload}): UserState => ({
        ...state,
        userAuthorities: {
            ...state.userAuthorities,
            isLoading: false,
            isSuccess: false,
            createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
            message: payload == null || payload.message == null ? null : payload.message,
            data: null
        }
        })
    ),
    on(fromUserAction.userAuthoritiesAddRequest, (state, {userId, authorityIds}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userAuthoritiesAddSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userAuthoritiesAddFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userAuthoritiesRemoveRequest, (state, {userId, authorityId}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userAuthoritiesRemoveSuccess, (state, {payload}): UserState => ({
        ...state,
        })
    ),
    on(fromUserAction.userAuthoritiesRemoveFailure, (state, {payload}): UserState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return UserReducer(state, action);
}
export const scopeFeatureSelector = createFeatureSelector<UserState>('user');

export const isUserPageLoading = (state: UserState) => state.tablePage.isLoading;
export const isUserPageLoadedSuccess = (state: UserState) => state.tablePage.isSuccess;
export const isUserPageLoadedFailure = (state: UserState) => !state.tablePage.isLoading  && !state.tablePage.isSuccess;
export const getUserPageData = (state: UserState) => state.tablePage.data;
export const getUserPageMessage = (state: UserState) => state.tablePage.message;
export const getUserPageTotalCount = (state: UserState) => state.tablePage.totalCount;
export const getUserPageCurrentPage = (state: UserState) => state.tablePage.currentPage;
export const getUserPageCurrentSize = (state: UserState) => state.tablePage.currentSize;

export const isUserSettingsLoading = (state: UserState) => state.userSettings.isLoading;
export const isUserSettingsLoadedSuccess = (state: UserState) => state.userSettings.isSuccess;
export const isUserSettingsLoadedFailure = (state: UserState) => !state.userSettings.isLoading  && !state.userSettings.isSuccess;
export const getUserSettingsData = (state: UserState) => state.userSettings.data;
export const getUserSettingsMessage = (state: UserState) => state.userSettings.message;

export const isUserProfileLoading = (state: UserState) => state.userProfile.isLoading;
export const isUserProfileLoadedSuccess = (state: UserState) => state.userProfile.isSuccess;
export const isUserProfileLoadedFailure = (state: UserState) => !state.userProfile.isLoading  && !state.userProfile.isSuccess;
export const getUserProfileData = (state: UserState) => state.userProfile.data;
export const getUserProfileMessage = (state: UserState) => state.userProfile.message;

export const isUserRolesLoading = (state: UserState) => state.userRoles.isLoading;
export const isUserRolesLoadedSuccess = (state: UserState) => state.userRoles.isSuccess;
export const isUserRolesLoadedFailure = (state: UserState) => !state.userRoles.isLoading  && !state.userRoles.isSuccess;
export const getUserRolesData = (state: UserState) => state.userRoles.data;
export const getUserRolesMessage = (state: UserState) => state.userRoles.message;

export const isUserAuthoritiesLoading = (state: UserState) => state.userAuthorities.isLoading;
export const isUserAuthoritiesLoadedSuccess = (state: UserState) => state.userAuthorities.isSuccess;
export const isUserAuthoritiesLoadedFailure = (state: UserState) => !state.userAuthorities.isLoading  && !state.userAuthorities.isSuccess;
export const getUserAuthoritiesData = (state: UserState) => state.userAuthorities.data;
export const getUserAuthoritiesMessage = (state: UserState) => state.userAuthorities.message;



