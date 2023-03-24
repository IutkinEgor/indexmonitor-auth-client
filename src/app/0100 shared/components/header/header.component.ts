import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import * as fromIdenityTypes from '../../../0200 identity/types/_index'
import * as fromIdentityAction from '../../../0200 identity/store/identity.action'
import * as fromIdentitySelector from '../../../0200 identity/store/identity.selector';

import * as fromSharedTypes from '../../../0100 shared/types/_index'
import * as fromSharedAction from '../../../0100 shared/store/shared.action'

import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConnectServerDialogComponent } from '../connect-server-dialog/connect-server-dialog.component';
import { Observable } from 'rxjs';
import { UserInfo } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenavToggle: MatSidenav;
  isAuthenticated$: Observable<boolean>;
  userInfo: UserInfo 

  constructor(
    private store: Store,
    private dialog: MatDialog) {
      this.initializeValue();
    }



  initializeValue(){
    this.isAuthenticated$ =  this.store.pipe(select(fromIdentitySelector.isAuthenticatedSelector));
    this.store.pipe(select(fromIdentitySelector.userInfoSelector)).subscribe(info => this.userInfo = info);
  }
  
    
  connect(): void {
   this.dialog.open(ConnectServerDialogComponent);   
  }

  disconnect(): void {
    this.store.dispatch(fromIdentityAction.logoutRequest())
  }

  testSnackbarInfo(){
    this.store.dispatch(fromSharedAction.notificationInfo(fromSharedTypes.NotificationData.buildPayload('Info'))); 
  }
  testSnackbarSuccess(){
    this.store.dispatch(fromSharedAction.notificationSuccess(fromSharedTypes.NotificationData.buildPayload('Success'))); 
  }
  testSnackbarError(){
    this.store.dispatch(fromSharedAction.notificationError(fromSharedTypes.NotificationData.buildPayload('Error'))); 
  }

  register(){
    window.location.href = `${localStorage.getItem("issuer")}/register?redirectUrl=${location.origin}`;
  }
}
