
import { Action, createReducer, on } from "@ngrx/store";

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../types/_index';
import * as fromClientAction from './client-register.action'


export interface ClientRegisterState extends fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientRegisterInterface>{
    isLoading: boolean;
}

const initialState: ClientRegisterState = {
    isLoading: false,
    isSuccess: false,
    createdAt: null,
    data: null,
    message: null
}

const ClientRegisterReducer = createReducer(
    initialState, 
    on(fromClientAction.clientRegister, (state, {payload}): ClientRegisterState => ({
        ...state,
        isLoading: true,
        isSuccess: false,
        createdAt: null,
        data: payload,
        message: null
        })
    ),
    on(fromClientAction.clientRegisterSuccess, (state, {payload}): ClientRegisterState => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        createdAt: payload.createdAt,
        data: null,
        message: null
        })
    ),
    on(fromClientAction.clientRegisterFailure, (state, {payload}): ClientRegisterState => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        createdAt: payload.createdAt,
        data: null,
        message: payload.message
        })
    )
);

export function reducer(state = initialState, action: Action){
    return ClientRegisterReducer(state, action);
}

export const isLoading = (state: ClientRegisterState) => state.isLoading;
export const isSuccess = (state: ClientRegisterState) => state.isSuccess;
export const isFailure = (state: ClientRegisterState) => !state.isLoading  && !state.isSuccess;
export const getData = (state: ClientRegisterState) => state.data;



