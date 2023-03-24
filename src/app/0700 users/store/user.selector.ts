import { createSelector } from "@ngrx/store";
import * as fromUserReducer from './user.reducer'
import * as fromUserCardReducer from "./user.reducer";

export const userSelector =  createSelector(
    fromUserReducer.scopeFeatureSelector,
    (state: fromUserReducer.UserState) => state
)

//USER TABLE PAGE
export const isPageLoading =  createSelector(
    userSelector, fromUserReducer.isUserPageLoading
)
export const isPageLoadedSuccess =  createSelector(
    userSelector, fromUserReducer.isUserPageLoadedSuccess
)
export const isPageLoadedFailure =  createSelector(
    userSelector, fromUserReducer.isUserPageLoadedFailure
)
export const getPageData =  createSelector(
    userSelector, fromUserReducer.getUserPageData
)
export const getPageMessage =  createSelector(
    userSelector, fromUserReducer.getUserPageMessage
)
export const getPageElementsTotalCount =  createSelector(
    userSelector, fromUserReducer.getUserPageTotalCount
)
export const getPageCurrentPage =  createSelector(
    userSelector, fromUserReducer.getUserPageCurrentPage
)
export const getPageCurrentSize =  createSelector(
    userSelector, fromUserReducer.getUserPageCurrentSize
)
//USER SETTINGS
export const isUserSettingsLoading =  createSelector(
    userSelector, fromUserReducer.isUserSettingsLoading
)
export const isUserSettingsLoadedSuccess =  createSelector(
    userSelector, fromUserReducer.isUserSettingsLoadedSuccess
)
export const isUserSettingsLoadedFailure =  createSelector(
    userSelector, fromUserReducer.isUserSettingsLoadedFailure
)
export const getUserSettingsData =  createSelector(
    userSelector, fromUserReducer.getUserSettingsData
)
export const getUserSettingsMessage =  createSelector(
    userSelector, fromUserReducer.getUserSettingsMessage
)
//USER PROFILE
export const isUserProfileLoading =  createSelector(
    userSelector, fromUserReducer.isUserProfileLoading
)
export const isUserProfileLoadedSuccess =  createSelector(
    userSelector, fromUserReducer.isUserProfileLoadedSuccess
)
export const isUserProfileLoadedFailure =  createSelector(
    userSelector, fromUserReducer.isUserProfileLoadedFailure
)
export const getUserProfileData =  createSelector(
    userSelector, fromUserCardReducer.getUserProfileData
)
export const getUserProfileMessage =  createSelector(
    userSelector, fromUserCardReducer.getUserProfileMessage
)
//USER ROLES
export const isUserRolesLoading =  createSelector(
    userSelector, fromUserReducer.isUserRolesLoading
)
export const isUserRolesLoadedSuccess =  createSelector(
    userSelector, fromUserReducer.isUserRolesLoadedSuccess
)
export const isUserRolesLoadedFailure =  createSelector(
    userSelector, fromUserReducer.isUserRolesLoadedFailure
)
export const getUserRolesData =  createSelector(
    userSelector, fromUserCardReducer.getUserRolesData
)
export const getUserRolesMessage =  createSelector(
    userSelector, fromUserCardReducer.getUserRolesMessage
)
//USER AUTHORITIES
export const isUserAuthoritiesLoading =  createSelector(
    userSelector, fromUserReducer.isUserAuthoritiesLoading
)
export const isUserAuthoritiesLoadedSuccess =  createSelector(
    userSelector, fromUserReducer.isUserAuthoritiesLoadedSuccess
)
export const isUserAuthoritiesLoadedFailure =  createSelector(
    userSelector, fromUserReducer.isUserAuthoritiesLoadedFailure
)
export const getUserAuthoritiesData =  createSelector(
    userSelector, fromUserCardReducer.getUserAuthoritiesData
)
export const getUserAuthoritiesMessage =  createSelector(
    userSelector, fromUserCardReducer.getUserAuthoritiesMessage
)