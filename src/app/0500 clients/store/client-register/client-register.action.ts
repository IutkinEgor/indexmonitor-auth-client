import { createAction, props } from '@ngrx/store';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../types/_index';


export enum ActionType {
    CLIENT_REGISTER = '[0500 client] client register request',
    CLIENT_REGISTER_SUCCESS = '[0500 client] client register success',
    CLIENT_REGISTER_FAILURE = '[0500 client] client register failure',
}

export const clientRegister = createAction(
    ActionType.CLIENT_REGISTER, 
    props<{ payload: fromClientTypes.ClientRegisterInterface }>()
);
export const clientRegisterSuccess = createAction(
    ActionType.CLIENT_REGISTER_SUCCESS, 
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object | null> }>()
);
export const clientRegisterFailure = createAction(
    ActionType.CLIENT_REGISTER_FAILURE,
    props<{ payload: fromSharedTypes.BaseResponseInterface<Object | null>}>()
);

