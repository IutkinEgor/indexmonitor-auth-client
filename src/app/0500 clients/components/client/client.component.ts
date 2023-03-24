import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ClientRegisterDialogComponent } from '../client-register-dialog/client-register-dialog.component';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientRegisterAction from '../../../0500 clients/store/client-register/client-register.action';
import * as fromClientRegisterSelector from '../../../0500 clients/store/client-register/client-register.selector';
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
