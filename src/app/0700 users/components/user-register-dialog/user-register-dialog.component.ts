import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';


@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrls: ['./user-register-dialog.component.scss']
})
export class UserRegisterDialogComponent {

  //Form
  form: FormGroup;
  formValidation: FormControlStatus;
  
  constructor(private store: Store, private dialog: MatDialog, private actionsSubject: ActionsSubject,  private dialogRef: MatDialogRef<UserRegisterDialogComponent>, private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.initializeForm();
      this.initializeValue();
      this.actionsSubject.pipe(ofType(fromUserAction.userRegisterSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User registered") }));
        this.dialogRef.close();
    });
  }
  
  initializeForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.form.statusChanges
          .subscribe(val => this.formValidation = val);
    
  }

  initializeValue(): void {}

  submit(){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: "Register user",
        message: `Register user?`,
        level: fromSharedTypes.ConfirmDialogLevelEnum.accent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromUserAction.userRegisterRequest({
          payload: {
            userName: this.form.value.userName,
            givenName: this.form.value.givenName,
            familyName: this.form.value.familyName,
            email: this.form.value.email,
            password: this.form.value.password,
            confirmPassword: this.form.value.confirmPassword,
        }}))
      }
    })
  }
}
