import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromroleTypes from '../types/_index';


export enum ActionType {

    ROLE_REGISTER_REQUEST = '[0800 role] register request',
    ROLE_REGISTER_SUCCESS = '[0800 role] register success',
    ROLE_REGISTER_FAILURE = '[0800 role] register failure',

    ROLE_PAGE_LOAD_REQUEST = '[0800 role] page load request',
    ROLE_PAGE_LOAD_SUCCESS = '[0800 role] page load success',
    ROLE_PAGE_LOAD_FAILURE = '[0800 role] page load failure',

    ROLE_SETTINGS_LOAD_REQUEST = '[0800 role] settings load request',
    ROLE_SETTINGS_LOAD_SUCCESS = '[0800 role] settings load success',
    ROLE_SETTINGS_LOAD_FAILURE = '[0800 role] settings load failure',

    ROLE_USAGE_BY_USERS_LOAD_REQUEST = '[0800 role] usage by clients load request',
    ROLE_USAGE_BY_USERS_LOAD_SUCCESS = '[0800 role] usage by clients load success',
    ROLE_USAGE_BY_USERS_LOAD_FAILURE = '[0800 role] usage by clients load failure',

    ROLE_SETTINGS_UPDATE_REQUEST = '[0800 role] settings update request',
    ROLE_SETTINGS_UPDATE_SUCCESS = '[0800 role] settings update success',
    ROLE_SETTINGS_UPDATE_FAILURE = '[0800 role] settings update failure',

    ROLE_DELETE_REQUEST = '[0800 role] delete request',
    ROLE_DELETE_SUCCESS = '[0800 role] delete success',
    ROLE_DELETE_FAILURE = '[0800 role] delete failure',
}

//ROLE REGISTER
export const roleRegisterRequest = createAction(
    ActionType.ROLE_REGISTER_REQUEST,
    props<{ payload: fromroleTypes.RoleRegisterInterface }>()
);
export const roleRegisterSuccess = createAction(
    ActionType.ROLE_REGISTER_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const roleRegisterFailure = createAction(
    ActionType.ROLE_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE PAGE LOAD
export const rolePageLoadRequest = createAction(
    ActionType.ROLE_PAGE_LOAD_REQUEST,
    props<{ page: number, size: number }>()
);
export const rolePageLoadSuccess = createAction(
    ActionType.ROLE_PAGE_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.PageResponseInterface<fromroleTypes.RolePageInterface[]> }>()
);
export const rolePageLoadFailure = createAction(
    ActionType.ROLE_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE SETTINGS LOAD
export const roleSettingsLoadRequest = createAction(
    ActionType.ROLE_SETTINGS_LOAD_REQUEST,
    props<{ roleId: string }>()
);
export const roleSettingsLoadSuccess = createAction(
    ActionType.ROLE_SETTINGS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromroleTypes.RoleSettingsInterface> }>()
);
export const roleSettingsLoadFailure = createAction(
    ActionType.ROLE_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE USAGE BY USERS LOAD
export const roleUsageByUsersLoadRequest = createAction(
    ActionType.ROLE_USAGE_BY_USERS_LOAD_REQUEST,
    props<{ roleId: string }>()
);
export const roleUsageByUsersLoadSuccess = createAction(
    ActionType.ROLE_USAGE_BY_USERS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromroleTypes.RoleUsageByUsersInterface[]> }>()
);
export const roleUsageByUsersLoadFailure = createAction(
    ActionType.ROLE_USAGE_BY_USERS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE SETTINGS UPDATE
export const roleSettingsUpdateRequest = createAction(
    ActionType.ROLE_SETTINGS_UPDATE_REQUEST,
    props<{ roleId: string, payload: fromroleTypes.RoleSettingsUpdateInterface }>()
);
export const roleSettingsUpdateSuccess = createAction(
    ActionType.ROLE_SETTINGS_UPDATE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const roleSettingsUpdateFailure = createAction(
    ActionType.ROLE_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE DELETE
export const roleDeleteRequest = createAction(
    ActionType.ROLE_DELETE_REQUEST,
    props<{ roleId: string }>()
);
export const roleDeleteSuccess = createAction(
    ActionType.ROLE_DELETE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const roleDeleteFailure = createAction(
    ActionType.ROLE_DELETE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);


