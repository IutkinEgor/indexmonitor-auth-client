import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromUserTypes from '../types/_index';


export enum ActionType {

    USER_PAGE_LOAD_REQUEST = '[0700 user] page load request',
    USER_PAGE_LOAD_SUCCESS = '[0700 user] page load success',
    USER_PAGE_LOAD_FAILURE = '[0700 user] page load failure',

    USER_REGISTER_REQUEST = '[0700 user] register request',
    USER_REGISTER_SUCCESS = '[0700 user] register success',
    USER_REGISTER_FAILURE = '[0700 user] register failure',

    USER_SETTINGS_LOAD_REQUEST = '[0700 user] settings load request',
    USER_SETTINGS_LOAD_SUCCESS = '[0700 user] settings load success',
    USER_SETTINGS_LOAD_FAILURE = '[0700 user] settings load failure',

    USER_SETTINGS_UPDATE_REQUEST = '[0700 user] settings update request',
    USER_SETTINGS_UPDATE_SUCCESS = '[0700 user] settings update success',
    USER_SETTINGS_UPDATE_FAILURE = '[0700 user] settings update failure',

    USER_DELETE_REQUEST = '[0700 user] delete request',
    USER_DELETE_SUCCESS = '[0700 user] delete success',
    USER_DELETE_FAILURE = '[0700 user] delete failure',

    USER_PROFILE_LOAD_REQUEST = '[0700 user] profile load request',
    USER_PROFILE_LOAD_SUCCESS = '[0700 user] profile load success',
    USER_PROFILE_LOAD_FAILURE = '[0700 user] profile load failure',

    USER_ROLES_LOAD_REQUEST = '[0700 user] roles load request',
    USER_ROLES_LOAD_SUCCESS = '[0700 user] roles load success',
    USER_ROLES_LOAD_FAILURE = '[0700 user] roles load failure',

    USER_ROLES_ADD_REQUEST = '[0700 user] roles add request',
    USER_ROLES_ADD_SUCCESS = '[0700 user] roles add success',
    USER_ROLES_ADD_FAILURE = '[0700 user] roles add failure',

    USER_ROLES_REMOVE_REQUEST = '[0700 user] roles remove request',
    USER_ROLES_REMOVE_SUCCESS = '[0700 user] roles remove success',
    USER_ROLES_REMOVE_FAILURE = '[0700 user] roles remove failure',

    USER_AUTHORITIES_LOAD_REQUEST = '[0700 user] authorities load request',
    USER_AUTHORITIES_LOAD_SUCCESS = '[0700 user] authorities load success',
    USER_AUTHORITIES_LOAD_FAILURE = '[0700 user] authorities load failure',

    USER_AUTHORITIES_ADD_REQUEST = '[0700 user] authorities add request',
    USER_AUTHORITIES_ADD_SUCCESS = '[0700 user] authorities add success',
    USER_AUTHORITIES_ADD_FAILURE = '[0700 user] authorities add failure',

    USER_AUTHORITIES_REMOVE_REQUEST = '[0700 user] authorities remove request',
    USER_AUTHORITIES_REMOVE_SUCCESS = '[0700 user] authorities remove success',
    USER_AUTHORITIES_REMOVE_FAILURE = '[0700 user] authorities remove failure',
}

//PAGE LOAD
export const userPageLoadRequest = createAction(
    ActionType.USER_PAGE_LOAD_REQUEST,
    props<{ page: number, size: number}>()
);
export const userPageLoadSuccess = createAction(
    ActionType.USER_PAGE_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.PageResponseInterface<fromUserTypes.UserPageInterface[]> }>()
);
export const userPageLoadFailure = createAction(
    ActionType.USER_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER REGISTER
export const userRegisterRequest = createAction(
    ActionType.USER_REGISTER_REQUEST,
    props<{ payload: fromUserTypes.UserRegisterInterface}>()
);
export const userRegisterSuccess = createAction(
    ActionType.USER_REGISTER_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
export const userRegisterFailure = createAction(
    ActionType.USER_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER SETTINGS LOAD
export const userSettingsLoadRequest = createAction(
    ActionType.USER_SETTINGS_LOAD_REQUEST,
    props<{ userId: string }>()
);
export const userSettingsLoadSuccess = createAction(
    ActionType.USER_SETTINGS_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromUserTypes.UserSettingsInterface> }>()
);
export const userSettingsLoadFailure = createAction(
    ActionType.USER_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER SETTINGS UPDATE
export const userSettingsUpdateRequest = createAction(
    ActionType.USER_SETTINGS_UPDATE_REQUEST,
    props<{ userId: string, payload: fromUserTypes.UserSettingsUpdateInterface }>()
);
export const userSettingsUpdateSuccess = createAction(
    ActionType.USER_SETTINGS_UPDATE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userSettingsUpdateFailure = createAction(
    ActionType.USER_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER DELETE
export const userDeleteRequest = createAction(
    ActionType.USER_SETTINGS_UPDATE_REQUEST,
    props<{ userId: string }>()
);
export const userDeleteSuccess = createAction(
    ActionType.USER_SETTINGS_UPDATE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userDeleteFailure = createAction(
    ActionType.USER_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER PROFILE LOAD
export const userProfileLoadRequest = createAction(
    ActionType.USER_PROFILE_LOAD_REQUEST,
    props<{ userId: string }>()
);
export const userProfileLoadSuccess = createAction(
    ActionType.USER_PROFILE_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromUserTypes.UserProfileInterface> }>()
);
export const userProfileLoadFailure = createAction(
    ActionType.USER_PROFILE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER ROLES LOAD
export const userRolesLoadRequest = createAction(
    ActionType.USER_ROLES_LOAD_REQUEST,
    props<{ userId: string }>()
);
export const userRolesLoadSuccess = createAction(
    ActionType.USER_ROLES_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromUserTypes.UserRoleInterface[]> }>()
);
export const userRolesLoadFailure = createAction(
    ActionType.USER_ROLES_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER ROLES ADD
export const userRolesAddRequest = createAction(
    ActionType.USER_ROLES_ADD_REQUEST,
    props<{ userId: string, roleIds: string[] }>()
);
export const userRolesAddSuccess = createAction(
    ActionType.USER_ROLES_ADD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userRolesAddFailure = createAction(
    ActionType.USER_ROLES_ADD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER ROLES REMOVE
export const userRolesRemoveRequest = createAction(
    ActionType.USER_ROLES_REMOVE_REQUEST,
    props<{ userId: string, roleId: string }>()
);
export const userRolesRemoveSuccess = createAction(
    ActionType.USER_ROLES_REMOVE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userRolesRemoveFailure = createAction(
    ActionType.USER_ROLES_REMOVE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER AUTHORITIES LOAD
export const userAuthoritiesLoadRequest = createAction(
    ActionType.USER_AUTHORITIES_LOAD_REQUEST,
    props<{ userId: string }>()
);
export const userAuthoritiesLoadSuccess = createAction(
    ActionType.USER_AUTHORITIES_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromUserTypes.UserAuthorityInterface[]> }>()
);
export const userAuthoritiesLoadFailure = createAction(
    ActionType.USER_AUTHORITIES_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER AUTHORITIES ADD
export const userAuthoritiesAddRequest = createAction(
    ActionType.USER_AUTHORITIES_ADD_REQUEST,
    props<{ userId: string, authorityIds: string[] }>()
);
export const userAuthoritiesAddSuccess = createAction(
    ActionType.USER_AUTHORITIES_ADD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userAuthoritiesAddFailure = createAction(
    ActionType.USER_AUTHORITIES_ADD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
//USER AUTHORITIES REMOVE
export const userAuthoritiesRemoveRequest = createAction(
    ActionType.USER_AUTHORITIES_REMOVE_REQUEST,
    props<{ userId: string, authorityId: string }>()
);
export const userAuthoritiesRemoveSuccess = createAction(
    ActionType.USER_AUTHORITIES_REMOVE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const userAuthoritiesRemoveFailure = createAction(
    ActionType.USER_AUTHORITIES_REMOVE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);


