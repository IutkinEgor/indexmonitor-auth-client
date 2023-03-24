import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromIdentitySelector from '../store/identity.selector';

@Injectable()
export class AuthGuardWithForcedLoginService implements CanActivate {


  constructor(
    private authService: AuthService,
    private store: Store,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.pipe(select(fromIdentitySelector.isAuthenticatedSelector)).pipe(
      tap(authenticated => {
        if(!authenticated){
          this.authService.navigateToHome();
        }
      }))
  }
}
