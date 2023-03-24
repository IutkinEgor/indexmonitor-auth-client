import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActionsSubject, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromIdentityAction from '../../../0200 identity/store/identity.action';


@Component({
  selector: 'app-connect-server-dialog',
  templateUrl: './connect-server-dialog.component.html',
  styleUrls: ['./connect-server-dialog.component.scss']
})
export class ConnectServerDialogComponent {
  form: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ConnectServerDialogComponent>,
    private actionsSubject: ActionsSubject
    ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeValue(){
    this.actionsSubject.pipe(ofType(fromIdentityAction.authenticationSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Connection success") }));
      this.dialogRef.close();
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      issuer: ['http://192.168.0.101:8080', Validators.required],
      clientId: ['angular_ui_none', Validators.required],
      clientSecret: []
    });
  }

  connect(){
    this.store.dispatch(fromIdentityAction.authenticationRequest({ 
      payload: {
        issuer: this.form.value.issuer,
        clientId: this.form.value.clientId,
        clientSecret: this.form.value.clientSecret
      }
    }));
  }
}
