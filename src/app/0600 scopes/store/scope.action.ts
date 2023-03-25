import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromScopeTypes from '../types/_index';


export enum ActionType {

    SCOPE_REGISTER_REQUEST = '[0600 scope] register request',
    SCOPE_REGISTER_SUCCESS = '[0600 scope] register success',
    SCOPE_REGISTER_FAILURE = '[0600 scope] register failure',

    SCOPE_PAGE_LOAD_REQUEST = '[0600 scope] page load request',
    SCOPE_PAGE_LOAD_SUCCESS = '[0600 scope] page load success',
    SCOPE_PAGE_LOAD_FAILURE = '[0600 scope] page load failure',

    SCOPE_SETTINGS_LOAD_REQUEST = '[0600 scope] settings load request',
    SCOPE_SETTINGS_LOAD_SUCCESS = '[0600 scope] settings load success',
    SCOPE_SETTINGS_LOAD_FAILURE = '[0600 scope] settings load failure',

    SCOPE_USAGE_BY_CLINETS_LOAD_REQUEST = '[0600 scope] usage by clients load request',
    SCOPE_USAGE_BY_CLINETS_LOAD_SUCCESS = '[0600 scope] usage by clients load success',
    SCOPE_USAGE_BY_CLINETS_LOAD_FAILURE = '[0600 scope] usage by clients load failure',

    SCOPE_SETTINGS_UPDATE_REQUEST = '[0600 scope] settings update request',
    SCOPE_SETTINGS_UPDATE_SUCCESS = '[0600 scope] settings update success',
    SCOPE_SETTINGS_UPDATE_FAILURE = '[0600 scope] settings update failure',

    SCOPE_DELETE_REQUEST = '[0600 scope] delete request',
    SCOPE_DELETE_SUCCESS = '[0600 scope] delete success',
    SCOPE_DELETE_FAILURE = '[0600 scope] delete failure',
}

//SCOPE REGISTER
export const scopeRegisterRequest = createAction(
    ActionType.SCOPE_REGISTER_REQUEST,
    props<{ payload: fromScopeTypes.ScopeRegisterInterface }>()
);
export const scopeRegisterSuccess = createAction(
    ActionType.SCOPE_REGISTER_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const scopeRegisterFailure = createAction(
    ActionType.SCOPE_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//SCOPE PAGE LOAD
export const scopePageLoadRequest = createAction(
    ActionType.SCOPE_PAGE_LOAD_REQUEST,
    props<{ page: number, size: number }>()
);
export const scopePageLoadSuccess = createAction(
    ActionType.SCOPE_PAGE_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.PageResponseInterface<fromScopeTypes.ScopePageInterface[]> }>()
);
export const scopePageLoadFailure = createAction(
    ActionType.SCOPE_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//SCOPE SETTINGS LOAD
export const scopeSettingsLoadRequest = createAction(
    ActionType.SCOPE_SETTINGS_LOAD_REQUEST,
    props<{ scopeId: string }>()
);
export const scopeSettingsLoadSuccess = createAction(
    ActionType.SCOPE_SETTINGS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeSettingsInterface> }>()
);
export const scopeSettingsLoadFailure = createAction(
    ActionType.SCOPE_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//SCOPE USAGE BY CLIENTS LOAD
export const scopeUsageByClientsLoadRequest = createAction(
    ActionType.SCOPE_USAGE_BY_CLINETS_LOAD_REQUEST,
    props<{ scopeId: string }>()
);
export const scopeUsageByClientsLoadSuccess = createAction(
    ActionType.SCOPE_USAGE_BY_CLINETS_LOAD_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeUsageByClientInterface[]> }>()
);
export const scopeUsageByClientsLoadFailure = createAction(
    ActionType.SCOPE_USAGE_BY_CLINETS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//SCOPE SETTINGS UPDATE
export const scopeSettingsUpdateRequest = createAction(
    ActionType.SCOPE_SETTINGS_UPDATE_REQUEST,
    props<{ scopeId: string, payload: fromScopeTypes.ScopeUpdateInterface }>()
);
export const scopeSettingsUpdateSuccess = createAction(
    ActionType.SCOPE_SETTINGS_UPDATE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const scopeSettingsUpdateFailure = createAction(
    ActionType.SCOPE_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);

//SCOPE DELETE
export const scopeDeleteRequest = createAction(
    ActionType.SCOPE_DELETE_REQUEST,
    props<{ scopeId: string }>()
);
export const scopeDeleteSuccess = createAction(
    ActionType.SCOPE_DELETE_SUCCESS,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const scopeDeleteFailure = createAction(
    ActionType.SCOPE_DELETE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);


