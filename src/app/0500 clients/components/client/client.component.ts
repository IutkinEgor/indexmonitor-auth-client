import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromIdentitySelector from '../../../0200 identity/store/identity.selector';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  
  isAuthenticated$: Observable<boolean>;
  
  constructor(
    private store: Store
  ){
    this.initializeValue();
  }

  initializeValue(){
    this.isAuthenticated$ =  this.store.pipe(select(fromIdentitySelector.isAuthenticatedSelector));
  }
}
