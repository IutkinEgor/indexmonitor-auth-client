import { createSelector } from "@ngrx/store";
import * as fromClientReducer from '../client.reducer'
import * as fromClientTableReducer from "./client-table.reducer";


export const clientSelector =  createSelector(
    fromClientReducer.clientFeatureSelector,
    (state: fromClientReducer.ClientState) => state.clientTable
)

export const isLoading =  createSelector(
    clientSelector, fromClientTableReducer.isLoading
)
export const isSuccess =  createSelector(
    clientSelector, fromClientTableReducer.isSuccess
)
export const isFailure =  createSelector(
    clientSelector, fromClientTableReducer.isFailure
)
export const getData =  createSelector(
    clientSelector, fromClientTableReducer.getData
)