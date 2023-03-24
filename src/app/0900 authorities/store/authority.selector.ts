import { createSelector } from "@ngrx/store";
import * as fromAuthorityReducer from './authority.reducer'

export const authoritySelector =  createSelector(
    fromAuthorityReducer.authorityFeatureSelector,
    (state: fromAuthorityReducer.AuthorityState) => state
)
//Table
export const isAuthorityTableLoading =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityTableLoading
)
export const isAuthorityTableLoadedSuccess =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityTableLoadedSuccess
)
export const isAuthorityTableLoadedFailure =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityTableLoadedFailure
)
export const getAuthorityTableData =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityTableData
)
export const getAuthorityTableMessage =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityTableMessage
)
export const getAuthorityTableTotalCount =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityTableTotalCount
)
export const getAuthorityTableCurrentPage =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityTableCurrentPage
)
export const getAuthorityTableCurrentSize =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityTableCurrentSize
)

export const getPageElementById = (authorityId: string) => createSelector(
    authoritySelector, (data) => data.authorityTable.data?.find((record) => record.authorityId == authorityId));

//Settings
export const isAuthoritySettingsLoading =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthoritySettingsLoading
)
export const isAuthoritySettingsLoadedSuccess =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthoritySettingsLoadedSuccess
)
export const isAuthoritySettingsLoadedFailure =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthoritySettingsLoadedFailure
)
export const getAuthoritySettingsData =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthoritySettingsData
)
export const getAuthoritySettingsMessage =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthoritySettingsMessage
)
//Usage by client
export const isAuthorityAuthorityUsageByUsersLoading =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityUsageByUsersLoading
)
export const isAuthorityUsageByUsersLoadedSuccess =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityUsageByUsersLoadedSuccess
)
export const isAuthorityUsageByUsersLoadedFailure =  createSelector(
    authoritySelector, fromAuthorityReducer.isAuthorityUsageByUsersLoadedFailure
)
export const getAuthorityUsageByUsersData =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityUsageByUsersData
)
export const getAuthorityUsageByUsersMessage =  createSelector(
    authoritySelector, fromAuthorityReducer.getAuthorityUsageByUsersMessage
)

