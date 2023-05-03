import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ConnectServerDialogComponent } from '../connect-server-dialog/connect-server-dialog.component';
import { map, Observable } from 'rxjs';
import { UserInfo } from 'angular-oauth2-oidc';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import * as fromIdentityAction from '../../../0200 identity/store/identity.action'
import * as fromIdentitySelector from '../../../0200 identity/store/identity.selector';

import * as fromSharedTypes from '../../../0100 shared/types/_index'
import * as fromSharedAction from '../../../0100 shared/store/shared.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenavToggle: MatSidenav;
  isAuthenticated$: Observable<boolean>;
  userInfo: UserInfo 

  isWindowSmall: Boolean;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(breakpoint => this.isWindowSmall = breakpoint.matches)).subscribe();
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

 
}
