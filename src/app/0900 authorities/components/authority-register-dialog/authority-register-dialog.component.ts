import { Component } from '@angular/core';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromAuthorityAction from '../../store/authority.action';


@Component({
  selector: 'app-authority-register-dialog',
  templateUrl: './authority-register-dialog.component.html',
  styleUrls: ['./authority-register-dialog.component.scss']
})
export class AuthorityRegisterDialogComponent {
  //Form
  form: FormGroup;
  formValidation: FormControlStatus;

  constructor(private store: Store, private actionsSubject: ActionsSubject, private dialogRef: MatDialogRef<AuthorityRegisterDialogComponent>, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
    this.actionsSubject.pipe(ofType(fromAuthorityAction.authorityRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Authority registered") }));
      this.dialogRef.close();
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isEnable: [true, Validators.required],
      isObtainable: [true, Validators.required],
    });
    this.form.statusChanges
          .subscribe(val => this.formValidation = val);
  }

  initializeValue(): void {}

  submit(){
    this.store.dispatch(fromAuthorityAction.authorityRegisterRequest({payload: {
      name: this.form.value.name,
      description: this.form.value.description,
      isEnable: this.form.value.isEnable,
      isObtainable: this.form.value.isObtainable
    }}))
  }
}
