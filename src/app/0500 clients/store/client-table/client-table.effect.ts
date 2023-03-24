import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromClientTableAction from '../client-table/client-table.action' 
import { ClientService } from "../../services/client.service";


@Injectable()
export class ClientTableEffects {
    
    constructor(private actions$: Actions, private clientService: ClientService){}

    loadClientTable$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientTableAction.clientPageLoadRequest),
        switchMap(({page, size}) => this.clientService.loadClientPage(page, size).pipe(
            map(payload =>  fromClientTableAction.clientPageLoadSuccess({payload})),
            catchError(error => of(fromClientTableAction.clientPageLoadFailure(error)))
        ))
        )
    );

    deleteClient$ = createEffect(() => this.actions$.pipe(
        ofType(fromClientTableAction.clientDeleteRequest),
        switchMap(({id}) => this.clientService.deleteClient(id).pipe(
            map(payload =>  fromClientTableAction.clientDeleteSuccess({payload})),
            catchError(error => of(fromClientTableAction.clientDeleteFailure(error)))
        ))
        )
    );
}
