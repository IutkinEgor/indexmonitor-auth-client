import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store"

import * as fromClientCard from "./client-card/client-card.reducer" 
import * as fromClientRegister from "./client-register/client-register.reducer" 
import * as fromClientTable from "./client-table/client-table.reducer" 

//AGREGATE ROOT for module specific reducres
export interface ClientState {
    clientTable: fromClientTable.ClientTableState;
    clientRegister: fromClientRegister.ClientRegisterState;
    clientCard: fromClientCard.ClientCardState;
    
}

export const reducers: ActionReducerMap<ClientState> = {
    clientCard: fromClientCard.reducer,
    clientRegister: fromClientRegister.reducer,
    clientTable: fromClientTable.reducer
}

export const clientFeatureSelector = createFeatureSelector<
    ClientState
    >('client');

