import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientAction from '../../store/client.action'
import * as fromClientSelector from '../../../0500 clients/store/client.selector';


@Component({
  selector: 'app-client-card-settings',
  templateUrl: './client-card-settings.component.html',
  styleUrls: ['./client-card-settings.component.scss']
})
export class ClientCardSettingsComponent {
  clientId: string;
  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;
  //Form
  form: FormGroup;
  formValidation: FormControlStatus;

  authMethodEnum = Object.values(fromClientTypes.AuthMethodEnum);
  authGrantTypeEnum = new Set<fromClientTypes.AuthGrantTypeEnum>(Object.values(fromClientTypes.AuthGrantTypeEnum));
  authGrantTypeSlots: number = 4;
  redirectUrisSlots: number = 0;
  authMethodSecretRequaired = fromClientTypes.AuthMethodEnum.CLIENT_SECRET_BASIC;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private store: Store,private actionsSubject: ActionsSubject, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(fromClientAction.clientSettingsLoadRequest({ id: this.route.parent?.snapshot.params['clientId'] as string }));
    this.isLoading$ = this.store.pipe(select(fromClientSelector.isClientSettingsLoading));
    this.isSuccess$ = this.store.pipe(select(fromClientSelector.isClientSettingsLoadedSuccess));
    this.store.pipe(select(fromClientSelector.getClientSettingsData)).subscribe((data) =>  { if(data) { this.initializeValue(data) } });

    this.actionsSubject.pipe(ofType(fromClientAction.clientSettingsUpdateSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client updated") }));
        this.store.dispatch(fromClientAction.clientSettingsLoadRequest({ id: this.route.parent?.snapshot.params['clientId'] as string }));
      });
  }
  
  initializeForm(): void {
    this.form = this.formBuilder.group({
      clientId: ['', Validators.required],
      name: ['', Validators.required],
      description: [false],
      authenticationMethods: [ Validators.required],
      authorizationGrantTypes: this.formBuilder.array([]),
      origin: ['', Validators.required],
      redirectUris: this.formBuilder.array([]),
      requireProofKey: [false, Validators.required],
      requireAuthorizationConsent: [false, Validators.required]
    });
    this.form.get('authenticationMethods')?.disable();
    this.form.statusChanges.subscribe(val => this.formValidation = val);
  }

  initializeValue(data: fromClientTypes.ClientSettingsInterface | null): void {
    
      if(data != null) {   
        this.redirectUrisSlots = 0;
        this.form.get("clientId")?.setValue(data.clientId);
        this.form.get("createdAt")?.setValue(data.createdAt);
        this.form.get("name")?.setValue(data.name);
        this.form.get("description")?.setValue(data.description);
        this.form.get("authenticationMethods")?.setValue(data.authenticationMethods.values().next().value);
        this.form.get("origin")?.setValue(data.origin);
        this.form.get("requireProofKey")?.setValue(data.requireProofKey);
        this.form.get("requireAuthorizationConsent")?.setValue(data.requireAuthorizationConsent);    
        data.authorizationGrantTypes.forEach(grantType => {
          this.addGrantType(grantType)
        });  
        data.redirectUris.forEach(uri => {
          this.addRedirectUri(uri)
        });  
        console.log('redirect url size: ' + data.redirectUris)
      }
      
  }
  get grantTypes(){ return this.form.controls["authorizationGrantTypes"] as FormArray;  }
  addGrantType(name = "") {
    this.grantTypes.push(this.formBuilder.group({
      type : [name, [Validators.required]]
    }));
    this.authGrantTypeSlots--;
  }
  removeGrantType(index: number) {
    this.grantTypes.removeAt(index);
    this.authGrantTypeSlots++;
  }
  get redirectUris(){ return this.form.controls["redirectUris"] as FormArray;  }
  addRedirectUri(name = "") {
    this.redirectUris.push(this.formBuilder.group({
      uri : [name, [Validators.required]]
    }));
    this.redirectUrisSlots++;
  }
  removeRedirectUri(index: number) {
    this.redirectUris.removeAt(index);
    this.redirectUrisSlots--;
  }

  update(){
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          header: "Update client",
          message: `Update client settings?`,
          level: fromSharedTypes.ConfirmDialogLevelEnum.accent
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          const grantTypeValues = this.grantTypes.value as { type: string }[];
          const redirectUriValues = this.redirectUris.value as { uri: string }[];
          var authenticationMethods: Array<string> = new Array();
          authenticationMethods.push(this.form.get('authenticationMethods')?.value);
      
          this.store.dispatch(fromClientAction.clientSettingsUpdateRequest({
            id: this.route.parent?.snapshot.params['clientId'] as string, 
            payload: {
              clientId: this.form.value.clientId,
              name: this.form.value.name,
              description: this.form.value.description,
              authenticationMethods: authenticationMethods,
              authorizationGrantTypes: grantTypeValues.map((grantType) => grantType.type),
              origin: this.form.value.origin,
              redirectUris: redirectUriValues.map((redirectUri) => redirectUri.uri),
              requireProofKey: this.form.value.requireProofKey,
              requireAuthorizationConsent: this.form.value.requireAuthorizationConsent
            }}));
        }});
  }
}
