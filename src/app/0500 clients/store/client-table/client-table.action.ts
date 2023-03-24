import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../../0500 clients/types/_index';


export enum ActionType {
    CLIENT_PAGE_LOAD_REQUEST = '[0500 client] page load request',
    CLIENT_PAGE_LOAD_SUCCESS = '[0500 client] page load success',
    CLIENT_PAGE_LOAD_FAILURE = '[0500 client] page load failure',

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
    props<{ payload: fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTableInterface[]> }>()
);
export const clientPageLoadFailure = createAction(
    ActionType.CLIENT_PAGE_LOAD_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object>}>()
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
