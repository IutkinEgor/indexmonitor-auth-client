
import { Action, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientAction from './client-table.action'


export interface ClientTableState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTableInterface[]>{
    isLoading: boolean;
}

const initialState: ClientTableState = {
    isLoading: false,
    isSuccess: false,
    createdAt: null,
    data: null,
    message: null
}

const ClientTableReducer = createReducer(
    initialState, 
    on(fromClientAction.clientPageLoadRequest, (state): ClientTableState => ({
        ...state,
        isLoading: true,
        isSuccess: false,
        createdAt: null,
        message: null,
        data: null
        })
    ),
    on(fromClientAction.clientPageLoadSuccess, (state, {payload}): ClientTableState => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        createdAt: payload.createdAt,
        message: null,
        data: payload.data,
        })
    ),
    on(fromClientAction.clientPageLoadFailure, (state, {payload}): ClientTableState => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        createdAt: payload == null || payload.createdAt == null ? null : payload.createdAt,
        message: payload == null || payload.message == null ? null : payload.message,
        data: null
        })
    ),
    on(fromClientAction.clientDeleteRequest, (state): ClientTableState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientDeleteSuccess, (state): ClientTableState => ({
        ...state,
        })
    ),
    on(fromClientAction.clientDeleteFailure, (state): ClientTableState => ({
        ...state,
        })
    ),
);

export function reducer(state = initialState, action: Action){
    return ClientTableReducer(state, action);
}

export const isLoading = (state: ClientTableState) => state.isLoading;
export const isSuccess = (state: ClientTableState) => state.isSuccess;
export const isFailure = (state: ClientTableState) => !state.isLoading  && !state.isSuccess;
export const getData = (state: ClientTableState) => state.data;



