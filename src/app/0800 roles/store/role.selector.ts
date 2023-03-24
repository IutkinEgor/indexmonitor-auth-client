import { createSelector } from "@ngrx/store";
import * as fromRoleReducer from './role.reducer'

export const roleSelector =  createSelector(
    fromRoleReducer.roleFeatureSelector,
    (state: fromRoleReducer.RoleState) => state
)
//Table
export const isRoleTableLoading =  createSelector(
    roleSelector, fromRoleReducer.isRoleTableLoading
)
export const isRoleTableLoadedSuccess =  createSelector(
    roleSelector, fromRoleReducer.isRoleTableLoadedSuccess
)
export const isRoleTableLoadedFailure =  createSelector(
    roleSelector, fromRoleReducer.isRoleTableLoadedFailure
)
export const getRoleTableData =  createSelector(
    roleSelector, fromRoleReducer.getRoleTableData
)
export const getRoleTableMessage =  createSelector(
    roleSelector, fromRoleReducer.getRoleTableMessage
)
export const getRoleTableTotalCount =  createSelector(
    roleSelector, fromRoleReducer.getRoleTableTotalCount
)
export const getRoleTableCurrentPage =  createSelector(
    roleSelector, fromRoleReducer.getRoleTableCurrentPage
)
export const getRoleTableCurrentSize =  createSelector(
    roleSelector, fromRoleReducer.getRoleTableCurrentSize
)

export const getPageElementById = (roleId: string) => createSelector(
    roleSelector, (data) => data.roleTable.data?.find((record) => record.roleId == roleId));

//Settings
export const isRoleSettingsLoading =  createSelector(
    roleSelector, fromRoleReducer.isRoleSettingsLoading
)
export const isRoleSettingsLoadedSuccess =  createSelector(
    roleSelector, fromRoleReducer.isRoleSettingsLoadedSuccess
)
export const isRoleSettingsLoadedFailure =  createSelector(
    roleSelector, fromRoleReducer.isRoleSettingsLoadedFailure
)
export const getRoleSettingsData =  createSelector(
    roleSelector, fromRoleReducer.getRoleSettingsData
)
export const getRoleSettingsMessage =  createSelector(
    roleSelector, fromRoleReducer.getRoleSettingsMessage
)
//Usage by client
export const isRoleRoleUsageByUsersLoading =  createSelector(
    roleSelector, fromRoleReducer.isRoleUsageByUsersLoading
)
export const isRoleUsageByUsersLoadedSuccess =  createSelector(
    roleSelector, fromRoleReducer.isRoleUsageByUsersLoadedSuccess
)
export const isRoleUsageByUsersLoadedFailure =  createSelector(
    roleSelector, fromRoleReducer.isRoleUsageByUsersLoadedFailure
)
export const getRoleUsageByUsersData =  createSelector(
    roleSelector, fromRoleReducer.getRoleUsageByUsersData
)
export const getRoleUsageByUsersMessage =  createSelector(
    roleSelector, fromRoleReducer.getRoleUsageByUsersMessage
)

