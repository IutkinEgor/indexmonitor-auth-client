import { createSelector } from "@ngrx/store";

import * as fromIdentityReducer from "./identity.reducer";

export const identitySelector =  createSelector(
    fromIdentityReducer.identityFeatureSelector,
    (state: fromIdentityReducer.IdentityState) => state
)

export const isLoadingSelector =  createSelector(
    identitySelector, fromIdentityReducer.isLoading
)
export const isAuthenticatedSelector =  createSelector(
    identitySelector, fromIdentityReducer.isAuthenticated
)
export const catActivateSelector =  createSelector(
    identitySelector, fromIdentityReducer.canActivate
)
export const userInfoSelector =  createSelector(
    identitySelector, fromIdentityReducer.getUserInfo
)