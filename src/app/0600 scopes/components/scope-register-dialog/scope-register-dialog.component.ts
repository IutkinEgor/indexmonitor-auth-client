import { Component } from '@angular/core';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromScopeAction from '../../store/scope.action';


@Component({
  selector: 'app-scope-register-dialog',
  templateUrl: './scope-register-dialog.component.html',
  styleUrls: ['./scope-register-dialog.component.scss']
})
export class ScopeRegisterDialogComponent {
  //Form
  form: FormGroup;
  formValidation: FormControlStatus;

  constructor(private store: Store, private actionsSubject: ActionsSubject,private dialogRef: MatDialogRef<ScopeRegisterDialogComponent>,  private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
    this.actionsSubject.pipe(ofType(fromScopeAction.scopeRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Scope registered") }));
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
    this.store.dispatch(fromScopeAction.scopeRegisterRequest({payload: {
      name: this.form.value.name,
      description: this.form.value.description,
      isEnable: this.form.value.isEnable,
      isObtainable: this.form.value.isObtainable
    }}))
  }
}
