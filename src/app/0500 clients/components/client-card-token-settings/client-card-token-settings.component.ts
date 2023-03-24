import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromClientCardAction from '../../../0500 clients/store/client-card/client-card.action'
import * as fromClientCardSelector from '../../../0500 clients/store/client-card/client-card.selector';


@Component({
  selector: 'app-client-card-token-settings',
  templateUrl: './client-card-token-settings.component.html',
  styleUrls: ['./client-card-token-settings.component.scss']
})
export class ClientCardTokenSettingsComponent {

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  //Form
  form: FormGroup;
  formValidation: FormControlStatus;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private store: Store,private actionsSubject: ActionsSubject, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(fromClientCardAction.clientTokenSettingsLoadRequest({ id: this.route.parent?.snapshot.paramMap.get('clientId') as string }))
    this.isLoading$ = this.store.pipe(select(fromClientCardSelector.isTokenSettingsLoading));
    this.isSuccess$ = this.store.pipe(select(fromClientCardSelector.isTokenSettingsLoadedSuccess));
    this.store.pipe(select(fromClientCardSelector.getTokenSettingsData))
      .subscribe((data) =>  { if(data) { this.initializeValue(data) } });

    this.actionsSubject.pipe(ofType(fromClientCardAction.clientTokenSettingsUpdateSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client token updated") }));
        this.store.dispatch(fromClientCardAction.clientTokenSettingsLoadRequest({ id: this.route.parent?.snapshot.paramMap.get('clientId') as string }));
      });
  }
  
  initializeForm(): void {  
    this.form = this.formBuilder.group({
      authorizationCodeTimeToLive: [0, Validators.required],
      accessTokenTimeToLive: [0, Validators.required],
      refreshTokenTimeToLive: [0, Validators.required],
      reuseRefreshTokens: [false, Validators.required],
    });
    this.form.statusChanges
          .subscribe(val => this.formValidation = val);
  }

  initializeValue(data: fromClientTypes.ClientTokenSettingsInterface): void {
        this.form.get("authorizationCodeTimeToLive")?.setValue(data.authorizationCodeTimeToLive);
        this.form.get("accessTokenTimeToLive")?.setValue(data.accessTokenTimeToLive);
        this.form.get("refreshTokenTimeToLive")?.setValue(data.refreshTokenTimeToLive);
        this.form.get("reuseRefreshTokens")?.setValue(data.reuseRefreshTokens);     
  }

  update(){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: "Update client",
        message: `Update token settings?`,
        level: fromSharedTypes.ConfirmDialogLevelEnum.accent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromClientCardAction.clientTokenSettingsUpdateRequest({
          id: this.route.parent?.snapshot.params['clientId'] as string, 
          payload: {
          authorizationCodeTimeToLive: this.form.value.authorizationCodeTimeToLive,
          accessTokenTimeToLive: this.form.value.accessTokenTimeToLive,
          refreshTokenTimeToLive: this.form.value.refreshTokenTimeToLive,
          reuseRefreshTokens: this.form.value.reuseRefreshTokens
        }}));
      }});
  }
}
