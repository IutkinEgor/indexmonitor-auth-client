import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../types/_index';


export enum ActionType {

    CLIENT_TABLE_LOAD_REQUEST = '[0500 client] table load request',
    CLIENT_TABLE_LOAD_SUCCESS = '[0500 client] table load success',
    CLIENT_TABLE_LOAD_FAILURE = '[0500 client] table load failure',

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
}

export const clientTableLoadRequest = createAction(
    ActionType.CLIENT_TABLE_LOAD_REQUEST
);
export const clientTableLoadSuccess = createAction(
    ActionType.CLIENT_TABLE_LOAD_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTableInterface[]> }>()
);
export const clientTableLoadFailure = createAction(
    ActionType.CLIENT_TABLE_LOAD_FAILURE,
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


