import { createSelector } from "@ngrx/store";
import * as fromScopeReducer from './scope.reducer'

export const scopeSelector =  createSelector(
    fromScopeReducer.scopeFeatureSelector,
    (state: fromScopeReducer.ScopeState) => state
)
//Table
export const isTableLoading =  createSelector(
    scopeSelector, fromScopeReducer.isTableLoading
)
export const isTableLoadedSuccess =  createSelector(
    scopeSelector, fromScopeReducer.isTableLoadedSuccess
)
export const isTableLoadedFailure =  createSelector(
    scopeSelector, fromScopeReducer.isTableLoadedFailure
)
export const getTableData =  createSelector(
    scopeSelector, fromScopeReducer.getTableData
)
export const getTableMessage =  createSelector(
    scopeSelector, fromScopeReducer.getTableMessage
)
export const getTableTotalCount =  createSelector(
    scopeSelector, fromScopeReducer.getTableTotalCount
)
export const getTableCurrentPage =  createSelector(
    scopeSelector, fromScopeReducer.getTableCurrentPage
)
export const getTableCurrentSize =  createSelector(
    scopeSelector, fromScopeReducer.getTableCurrentSize
)

export const getPageElementById = (scopeId: string) => createSelector(
    scopeSelector, (data) => data.scopeTable.data?.find((record) => record.scopeId == scopeId));

//Settings
export const isSettingsLoading =  createSelector(
    scopeSelector, fromScopeReducer.isSettingsLoading
)
export const isSettingsLoadedSuccess =  createSelector(
    scopeSelector, fromScopeReducer.isSettingsLoadedSuccess
)
export const isSettingsLoadedFailure =  createSelector(
    scopeSelector, fromScopeReducer.isSettingsLoadedFailure
)
export const getSettingsData =  createSelector(
    scopeSelector, fromScopeReducer.getSettingsData
)
export const getSettingsMessage =  createSelector(
    scopeSelector, fromScopeReducer.getSettingsMessage
)
//Usage by client
export const isUsageByClientLoading =  createSelector(
    scopeSelector, fromScopeReducer.isUsageByClientLoading
)
export const isUsageByClientLoadedSuccess =  createSelector(
    scopeSelector, fromScopeReducer.isUsageByClientLoadedSuccess
)
export const isUsageByClientLoadedFailure =  createSelector(
    scopeSelector, fromScopeReducer.isUsageByClientLoadedFailure
)
export const getUsageByClientData =  createSelector(
    scopeSelector, fromScopeReducer.getUsageByClientData
)
export const getUsageByClientMessage =  createSelector(
    scopeSelector, fromScopeReducer.getUsageByClientMessage
)

