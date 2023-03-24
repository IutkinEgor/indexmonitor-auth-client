import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/*
 * INTERCEPTOR TEMPLATE.
 * Use this template to create own interceptor.
 */

@Injectable({
  providedIn: 'root'
})
export class TmpInterceptor implements HttpInterceptor{

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var req = request.clone(
                        { setHeaders:
                          {
                            
                          },
                          setParams: {
                            
                          }
                        } 
                       )
    return next.handle(req);
  }
}
