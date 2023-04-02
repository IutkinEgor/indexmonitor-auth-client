import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromClientTypes from '../types/_index';


export enum ActionType {

    CLIENT_PAGE_LOAD_REQUEST = '[0500 client] page load request',
    CLIENT_PAGE_LOAD_SUCCESS = '[0500 client] page load success',
    CLIENT_PAGE_LOAD_FAILURE = '[0500 client] page load failure',

    CLIENT_SETTINGS_LOAD_REQUEST = '[0500 client] settings load request',
    CLIENT_SETTINGS_LOAD_SUCCESS = '[0500 client] settings load success',
    CLIENT_SETTINGS_LOAD_FAILURE = '[0500 client] settings load failure',

    CLIENT_SETTINGS_UPDATE_REQUEST = '[0500 client] settings update request',
    CLIENT_SETTINGS_UPDATE_SUCCESS = '[0500 client] settings update success',
    CLIENT_SETTINGS_UPDATE_FAILURE = '[0500 client] settings update failure',

    CLIENT_TOKEN_SETTINGS_LOAD_REQUEST = '[0500 client] token settings load request',
    CLIENT_TOKEN_SETTINGS_LOAD_SUCCESS = '[0500 client] token settings load success',
    CLIENT_TOKEN_SETTINGS_LOAD_FAILURE = '[0500 client] token settings load failure',

    CLIENT_TOKEN_SETTINGS_UPDATE_REQUEST = '[0500 client] token settings update request',
    CLIENT_TOKEN_SETTINGS_UPDATE_SUCCESS = '[0500 client] token settings update success',
    CLIENT_TOKEN_SETTINGS_UPDATE_FAILURE = '[0500 client] token settings update failure',

    CLIENT_SCOPES_LOAD_REQUEST = '[0500 client] scopes load request',
    CLIENT_SCOPES_LOAD_SUCCESS = '[0500 client] scopes load success',
    CLIENT_SCOPES_LOAD_FAILURE = '[0500 client] scopes load failure',

    CLIENT_SCOPES_ADD_REQUEST = '[0500 client] scopes add request',
    CLIENT_SCOPES_ADD_SUCCESS = '[0500 client] scopes add success',
    CLIENT_SCOPES_ADD_FAILURE = '[0500 client] scopes add failure',

    CLIENT_SCOPES_REMOVE_REQUEST = '[0500 client] scopes remove request',
    CLIENT_SCOPES_REMOVE_SUCCESS = '[0500 client] scopes remove success',
    CLIENT_SCOPES_REMOVE_FAILURE = '[0500 client] scopes remove failure',

    CLIENT_REGISTER_REQUEST = '[0500 client] register request',
    CLIENT_REGISTER_SUCCESS = '[0500 client] register success',
    CLIENT_REGISTER_FAILURE = '[0500 client] register failure',

    CLIENT_DELETE_REQUEST = '[0500 client] delete request',
    CLIENT_DELETE_SUCCESS = '[0500 client] delete success',
    CLIENT_DELETE_FAILURE = '[0500 client] delete failure',
}

export const clientPageLoadRequest = createAction(
    ActionType.CLIENT_PAGE_LOAD_REQUEST,
    props<{ page: number, size: number }>()
);
export const clientPageLoadSuccess = createAction(
    ActionType.CLIENT_PAGE_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.PageResponseInterface<fromClientTypes.ClientTableInterface[]> }>()
);
export const clientPageLoadFailure = createAction(
    ActionType.CLIENT_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientSettingsLoadRequest = createAction(
    ActionType.CLIENT_SETTINGS_LOAD_REQUEST,
    props<{ id: string }>()
);
export const clientSettingsLoadSuccess = createAction(
    ActionType.CLIENT_SETTINGS_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientSettingsInterface> }>()
);
export const clientSettingsLoadFailure = createAction(
    ActionType.CLIENT_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientSettingsUpdateRequest = createAction(
    ActionType.CLIENT_SETTINGS_UPDATE_REQUEST,
    props<{ id: string, payload: fromClientTypes.ClientSettingsUpdateInterface }>()
);
export const clientSettingsUpdateSuccess = createAction(
    ActionType.CLIENT_SETTINGS_UPDATE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const clientSettingsUpdateFailure = createAction(
    ActionType.CLIENT_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientTokenSettingsLoadRequest = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_LOAD_REQUEST,
    props<{ id: string }>()
);
export const clientTokenSettingsLoadSuccess = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTokenSettingsInterface> }>()
);
export const clientTokenSettingsLoadFailure = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientTokenSettingsUpdateRequest = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_UPDATE_REQUEST,
    props<{ id: string, payload: fromClientTypes.ClientTokenSettingsUpdateInterfcae }>()
);
export const clientTokenSettingsUpdateSuccess = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_UPDATE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const clientTokenSettingsUpdateFailure = createAction(
    ActionType.CLIENT_TOKEN_SETTINGS_UPDATE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientScopesLoadRequest = createAction(
    ActionType.CLIENT_SCOPES_LOAD_REQUEST,
    props<{ id: string }>()
);
export const clientScopesLoadSuccess = createAction(
    ActionType.CLIENT_SCOPES_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientScopeInterface[]> }>()
);
export const clientScopesLoadFailure = createAction(
    ActionType.CLIENT_SCOPES_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientScopesAddRequest = createAction(
    ActionType.CLIENT_SCOPES_ADD_REQUEST,
    props<{ id: string, payload: fromClientTypes.ClientScopeUpdateInterface }>()
);
export const clientScopesAddSuccess = createAction(
    ActionType.CLIENT_SCOPES_ADD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const clientScopesAddFailure = createAction(
    ActionType.CLIENT_SCOPES_ADD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

export const clientScopesRemoveRequest = createAction(
    ActionType.CLIENT_SCOPES_REMOVE_REQUEST,
    props<{ clientId: string, scopeId: string }>()
);
export const clientScopesRemoveSuccess = createAction(
    ActionType.CLIENT_SCOPES_REMOVE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const clientScopesRemoveFailure = createAction(
    ActionType.CLIENT_SCOPES_REMOVE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);
export const clientRegisterRequest = createAction(
    ActionType.CLIENT_REGISTER_REQUEST, 
    props<{ payload: fromClientTypes.ClientRegisterInterface }>()
);
export const clientRegisterSuccess = createAction(
    ActionType.CLIENT_REGISTER_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object | null> }>()
);
export const clientRegisterFailure = createAction(
    ActionType.CLIENT_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object | null>}>()
);
export const clientDeleteRequest = createAction(
    ActionType.CLIENT_DELETE_REQUEST,
    props<{ id: string }>()
);
export const clientDeleteSuccess = createAction(
    ActionType.CLIENT_DELETE_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object> }>()
);
export const clientDeleteFailure = createAction(
    ActionType.CLIENT_DELETE_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
);

