import { createSelector } from "@ngrx/store";
import * as fromClientReducer from '../client.reducer'
import * as fromClientRegisterReducer from "./client-register.reducer";


export const clientSelector =  createSelector(
    fromClientReducer.clientFeatureSelector,
    (state: fromClientReducer.ClientState) => state.clientRegister
)

export const isLoading =  createSelector(
    clientSelector, fromClientRegisterReducer.isLoading
)
export const isSuccess =  createSelector(
    clientSelector, fromClientRegisterReducer.isSuccess
)
export const isFailure =  createSelector(
    clientSelector, fromClientRegisterReducer.isFailure
)
export const getData =  createSelector(
    clientSelector, fromClientRegisterReducer.getData
)