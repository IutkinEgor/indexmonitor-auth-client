import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientRegisterAction from '../../../0500 clients/store/client-register/client-register.action'
import * as fromClientRegisterSelector from '../../../0500 clients/store/client-register/client-register.selector';
import * as fromClientCardAction from '../../../0500 clients/store/client-card/client-card.action'
import * as fromClientCardSelector from '../../../0500 clients/store/client-card/client-card.selector';


@Component({
  selector: 'app-client-register-dialog',
  templateUrl: './client-register-dialog.component.html',
  styleUrls: ['./client-register-dialog.component.scss']
})
export class ClientRegisterDialogComponent {

 //Form
 form: FormGroup;
 formValidation: FormControlStatus;
 authMethodEnum = Object.values(fromClientTypes.AuthMethodEnum);
 authGrantTypeEnum = new Set<fromClientTypes.AuthGrantTypeEnum>(Object.values(fromClientTypes.AuthGrantTypeEnum));
 authGrantTypeSlots: number = 4;
 redirectUrisSlots: number = 0;
 authMethodBasic = fromClientTypes.AuthMethodEnum.CLIENT_SECRET_BASIC;
 authMethodPost = fromClientTypes.AuthMethodEnum.CLIENT_SECRET_POST;
 constructor(private store: Store, private formBuilder: FormBuilder, private actionsSubject: ActionsSubject,private dialogRef: MatDialogRef<ClientRegisterDialogComponent>){}

 ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
    this.actionsSubject.pipe(ofType(fromClientRegisterAction.clientRegisterSuccess)).subscribe(() => {
      this.dialogRef.close();
    });
 }
 
 initializeForm(): void {
   this.form = this.formBuilder.group({
     clientId: ['', Validators.required],
     name: ['', Validators.required],
     description: [''],
     authenticationMethods: [fromClientTypes.AuthMethodEnum.CLIENT_SECRET_BASIC,Validators.required],
     secret: [],
     authorizationGrantTypes: this.formBuilder.array([], Validators.required),
     origin: ['', Validators.required],
     redirectUris: this.formBuilder.array([], Validators.required),
   });
   this.form.statusChanges
         .subscribe(val => this.formValidation = val);
 }

 initializeValue(): void {   
     this.addGrantType(fromClientTypes.AuthGrantTypeEnum.AUTHORIZATION_CODE)
     this.addRedirectUri("")
     
 }
 get grantTypes(){ return this.form.controls["authorizationGrantTypes"] as FormArray; }
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

 get redirectUris(){ return this.form.controls["redirectUris"] as FormArray; }
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

 get isSecretRequared(){
  const authnMethodValue = this.form.get('authenticationMethods')?.value as string
  return authnMethodValue == this.authMethodBasic || authnMethodValue == this.authMethodPost;
 }
  submit(){
    const grantTypeValues = this.grantTypes.value as { type: string }[];
    const grantTypes: Array<string> = grantTypeValues.map((grantType) => grantType.type);

    const redirectUriValues = this.redirectUris.value as { uri: string }[];
    const redirectUris: Array<string> = redirectUriValues.map((redirectUri) => redirectUri.uri);
    
    const authenticationMethodValues = this.form.get('authenticationMethods')?.value as string;
    var authenticationMethods: Array<string> = new Array();
    authenticationMethods.push(authenticationMethodValues);

    this.store.dispatch(fromClientRegisterAction.clientRegister({payload: {
      clientId: this.form.value.clientId,
      name: this.form.value.name,
      description: this.form.value.description,
      authenticationMethods: authenticationMethods,
      secret: this.isSecretRequared ? this.form.value.secret : null,
      authorizationGrantTypes: grantTypes,
      origin: this.form.value.origin,
      redirectUris: redirectUris,
    }}))
  }
}
