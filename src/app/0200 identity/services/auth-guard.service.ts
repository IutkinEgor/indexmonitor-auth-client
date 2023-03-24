import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromIdentitySelector from '../store/identity.selector';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot    
  ): Observable<boolean> {
    return this.store.pipe(select(fromIdentitySelector.catActivateSelector));
  }
}
