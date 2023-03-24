import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromroleTypes from '../types/_index';


export enum ActionType {

    AUTHORITY_REGISTER_REQUEST = '[0900 authority] register request',
    AUTHORITY_REGISTER_SUCCESS = '[0900 authority] register success',
    AUTHORITY_REGISTER_FAILURE = '[0900 authority] register failure',

    AUTHORITY_PAGE_LOAD_REQUEST = '[0900 authority] page load request',
    AUTHORITY_PAGE_LOAD_SUCCESS = '[0900 authority] page load success',
    AUTHORITY_PAGE_LOAD_FAILURE = '[0900 authority] page load failure',

    AUTHORITY_SETTINGS_LOAD_REQUEST = '[0900 authority] settings load request',
    AUTHORITY_SETTINGS_LOAD_SUCCESS = '[0900 authority] settings load success',
    AUTHORITY_SETTINGS_LOAD_FAILURE = '[0900 authority] settings load failure',

    AUTHORITY_USAGE_BY_USERS_LOAD_REQUEST = '[0900 authority] usage by clients load request',
    AUTHORITY_USAGE_BY_USERS_LOAD_SUCCESS = '[0900 authority] usage by clients load success',
    AUTHORITY_USAGE_BY_USERS_LOAD_FAILURE = '[0900 authority] usage by clients load failure',

    AUTHORITY_SETTINGS_UPDATE_REQUEST = '[0900 authority] settings update request',
    AUTHORITY_SETTINGS_UPDATE_SUCCESS = '[0900 authority] settings update success',
    AUTHORITY_SETTINGS_UPDATE_FAILURE = '[0900 authority] settings update failure',

    AUTHORITY_DELETE_REQUEST = '[0900 authority] delete request',
    AUTHORITY_DELETE_SUCCESS = '[0900 authority] delete success',
    AUTHORITY_DELETE_FAILURE = '[0900 authority] delete failure',
}

//ROLE REGISTER
export const authorityRegisterRequest = createAction(
    ActionType.AUTHORITY_REGISTER_REQUEST,
    props<{ payload: fromroleTypes.AuthorityRegisterInterface }>()
);
export const authorityRegisterSuccess = createAction(
    ActionType.AUTHORITY_REGISTER_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const authorityRegisterFailure = createAction(
    ActionType.AUTHORITY_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE PAGE LOAD
export const authorityPageLoadRequest = createAction(
    ActionType.AUTHORITY_PAGE_LOAD_REQUEST,
    props<{ page: number, size: number }>()
);
export const authorityPageLoadSuccess = createAction(
    ActionType.AUTHORITY_PAGE_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.PageResponseInterface<fromroleTypes.AuthorityPageInterface[]> }>()
);
export const authorityPageLoadFailure = createAction(
    ActionType.AUTHORITY_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE SETTINGS LOAD
export const authoritySettingsLoadRequest = createAction(
    ActionType.AUTHORITY_SETTINGS_LOAD_REQUEST,
    props<{ authorityId: string }>()
);
export const authoritySettingsLoadSuccess = createAction(
    ActionType.AUTHORITY_SETTINGS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromroleTypes.AuthoritySettingsInterface> }>()
);
export const authoritySettingsLoadFailure = createAction(
    ActionType.AUTHORITY_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE USAGE BY USERS LOAD
export const authorityUsageByUsersLoadRequest = createAction(
    ActionType.AUTHORITY_USAGE_BY_USERS_LOAD_REQUEST,
    props<{ authorityId: string }>()
);
export const authorityUsageByUsersLoadSuccess = createAction(
    ActionType.AUTHORITY_USAGE_BY_USERS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromroleTypes.AuthorityUsageByUsersInterface[]> }>()
);
export const authorityUsageByUsersLoadFailure = createAction(
    ActionType.AUTHORITY_USAGE_BY_USERS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE SETTINGS UPDATE
export const authoritySettingsUpdateRequest = createAction(
    ActionType.AUTHORITY_SETTINGS_UPDATE_REQUEST,
    props<{ authorityId: string, payload: fromroleTypes.AuthoritySettingsUpdateInterface }>()
);
export const authoritySettingsUpdateSuccess = createAction(
    ActionType.AUTHORITY_SETTINGS_UPDATE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const authoritySettingsUpdateFailure = createAction(
    ActionType.AUTHORITY_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//ROLE DELETE
export const authorityDeleteRequest = createAction(
    ActionType.AUTHORITY_DELETE_REQUEST,
    props<{ authorityId: string }>()
);
export const authorityDeleteSuccess = createAction(
    ActionType.AUTHORITY_DELETE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const authorityDeleteFailure = createAction(
    ActionType.AUTHORITY_DELETE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);


