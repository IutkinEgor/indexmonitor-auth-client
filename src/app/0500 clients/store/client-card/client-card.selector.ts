import { createSelector } from "@ngrx/store";
import * as fromClientReducer from '../client.reducer'
import * as fromClientCardReducer from "./client-card.reducer";


export const clientSelector =  createSelector(
    fromClientReducer.clientFeatureSelector,
    (state: fromClientReducer.ClientState) => state.clientCard
)

//Client Settings
export const isClientSettingsLoading =  createSelector(
    clientSelector, fromClientCardReducer.isClientSettingsLoading
)
export const isClientSettingsLoadedSuccess =  createSelector(
    clientSelector, fromClientCardReducer.isClientSettingsLoadedSuccess
)
export const isClientSettingsLoadedFailure =  createSelector(
    clientSelector, fromClientCardReducer.isClientSettingsLoadedFailure
)
export const getClientSettingsData =  createSelector(
    clientSelector, fromClientCardReducer.getClientSettingsData
)
export const getClientSettingsMessage =  createSelector(
    clientSelector, fromClientCardReducer.getClientSettingsMessage
)
//Token Settings
export const isTokenSettingsLoading =  createSelector(
    clientSelector, fromClientCardReducer.isTokenSettingsLoading
)
export const isTokenSettingsLoadedSuccess =  createSelector(
    clientSelector, fromClientCardReducer.isTokenSettingsLoadedSuccess
)
export const isTokenSettingsLoadedFailure =  createSelector(
    clientSelector, fromClientCardReducer.isTokenSettingsLoadedFailure
)
export const getTokenSettingsData =  createSelector(
    clientSelector, fromClientCardReducer.getTokenSettingsData
)
export const getTokenSettingsMessage =  createSelector(
    clientSelector, fromClientCardReducer.getTokenSettingsMessage
)
//Scopes
export const isScopesLoading =  createSelector(
    clientSelector, fromClientCardReducer.isScopesLoading
)
export const isScopesLoadedSuccess =  createSelector(
    clientSelector, fromClientCardReducer.isScopesLoadedSuccess
)
export const isScopesLoadedFailure =  createSelector(
    clientSelector, fromClientCardReducer.isScopesLoadedFailure
)
export const getScopesData =  createSelector(
    clientSelector, fromClientCardReducer.getScopesData
)
export const getScopesMessage =  createSelector(
    clientSelector, fromClientCardReducer.getScopesMessage
)