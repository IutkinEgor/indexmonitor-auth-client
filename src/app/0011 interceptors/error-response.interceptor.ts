import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromSharedTypes from '../0100 shared/types/_index';
import * as fromSharedAction from '../0100 shared/store/shared.action';

@Injectable({
  providedIn: 'root'
})
export class ErrorResponseInterceptor implements HttpInterceptor{

  constructor(private store: Store) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
       catchError((error: HttpErrorResponse) => {
            if(error.status === 0) {
                this.store.dispatch(fromSharedAction.notificationError(fromSharedTypes.NotificationData.buildPayload('No connection with server')));   
            } else if (fromSharedTypes.BaseResponseInterface.isBaseResponseInterface(error.error))
            {
                this.store.dispatch(fromSharedAction.notificationError(fromSharedTypes.NotificationData.buildPayload(error.error.message as string))); 
            }
            else{
                this.store.dispatch(fromSharedAction.notificationError(fromSharedTypes.NotificationData.buildPayload('Ops... somethig went wrong.')));   
            }
            return throwError(error);
      })
    );
  }
}
