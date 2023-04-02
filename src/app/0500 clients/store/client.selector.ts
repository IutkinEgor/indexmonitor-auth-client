import { createSelector } from "@ngrx/store";
import * as fromClientReducer from './client.reducer'
import * as fromClientCardReducer from "./client.reducer";


export const clientSelector =  createSelector(
    fromClientReducer.clientFeatureSelector,
    (state: fromClientReducer.ClientState) => state
)

// Client Page
export const isClientPageLoading =  createSelector(
    clientSelector, fromClientCardReducer.isClientPageLoading
)
export const isClientPageSuccess =  createSelector(
    clientSelector, fromClientCardReducer.isClientPageSuccess
)
export const isClientPageFailure =  createSelector(
    clientSelector, fromClientCardReducer.isClientPageFailure
)
export const getClientPageData =  createSelector(
    clientSelector, fromClientCardReducer.getClientPageData
)
export const getClientPageMessage =  createSelector(
    clientSelector, fromClientCardReducer.getClientPageMessage
)
export const getClientPageTotalCount =  createSelector(
    clientSelector, fromClientCardReducer.getClientPageTotalCount
)
export const getClientPageCurrentPage =  createSelector(
    clientSelector, fromClientCardReducer.getClientPageCurrentPage
)
export const getClientPageCurrentSize =  createSelector(
    clientSelector, fromClientCardReducer.getClientPageCurrentSize
)
export const getClientPageElementById = (id: string) => createSelector(
    clientSelector, (data) => data.clientTable.data?.find((record) => record.id == id));

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