import { Component } from '@angular/core';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromRoleAction from '../../store/role.action';


@Component({
  selector: 'app-role-register-dialog',
  templateUrl: './role-register-dialog.component.html',
  styleUrls: ['./role-register-dialog.component.scss']
})
export class RoleRegisterDialogComponent {
  //Form
  form: FormGroup;
  formValidation: FormControlStatus;

  constructor(private store: Store,    private dialog: MatDialog, private actionsSubject: ActionsSubject, private dialogRef: MatDialogRef<RoleRegisterDialogComponent>, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
    this.actionsSubject.pipe(ofType(fromRoleAction.roleRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Role registered") }));
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
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Register role",
      message: `Confirm an action`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.accent
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromRoleAction.roleRegisterRequest({payload: {
          name: this.form.value.name,
          description: this.form.value.description,
          isEnable: this.form.value.isEnable,
          isObtainable: this.form.value.isObtainable
        }}))
      }
    })
  }
}
