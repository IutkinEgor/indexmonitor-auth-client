import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromRoleTypes from '../../../0800 roles/types/_index';
import * as fromRoleAction from '../../../0800 roles/store/role.action';
import * as fromRoleSelector from '../../../0800 roles/store/role.selector';


@Component({
  selector: 'app-role-settings',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.scss']
})
export class RoleSettingsComponent implements OnInit{

  isLoading$: Observable<boolean>;
  isLoadSuccess$: Observable<boolean>;

  createdAt: number;
  createdBy: string;

  //Form 
  form: FormGroup;
  formValidation: FormControlStatus;

  constructor(private store: Store, private dialog: MatDialog, private actionsSubject: ActionsSubject, private route: ActivatedRoute, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(fromRoleAction.roleSettingsLoadRequest({ roleId: this.route.parent?.snapshot.params['roleId'] as string }))
    this.isLoading$ = this.store.pipe(select(fromRoleSelector.isRoleSettingsLoading));
    this.isLoadSuccess$ = this.store.pipe(select(fromRoleSelector.isRoleSettingsLoadedSuccess));
    this.store.select(fromRoleSelector.getRoleSettingsData).subscribe((data)=> { if(data)  this.initializeValue(data) });
    this.actionsSubject.pipe(ofType(fromRoleAction.roleSettingsUpdateSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("role updated.")}));
      this.store.dispatch(fromRoleAction.roleSettingsLoadRequest({ roleId: this.route.parent?.snapshot.params['roleId'] as string }));
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isEnable:  [true, Validators.required],
      isObtainable: [true, Validators.required],
    });
    this.form.statusChanges.subscribe(val => this.formValidation = val);
  }

  initializeValue(data: fromRoleTypes.RoleSettingsInterface): void {
      this.createdAt = data.createdAt;
      this.createdBy = data.createdBy;
      this.form.get("name")?.setValue(data.name);
      this.form.get("description")?.setValue(data.description);
      this.form.get("isEnable")?.setValue(data.isEnable);
      this.form.get("isObtainable")?.setValue(data.isObtainable);   
  }

  update(){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: "Update role",
        message: `Update role settings?`,
        level: fromSharedTypes.ConfirmDialogLevelEnum.accent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromRoleAction.roleSettingsUpdateRequest({
          roleId: this.route.parent?.snapshot.params['roleId'] as string, 
          payload: {
            name: this.form.value.name,
            description: this.form.value.description,
            isEnable: this.form.value.isEnable,
            isObtainable: this.form.value.isObtainable
          }
      }))
      }});
  }
}
