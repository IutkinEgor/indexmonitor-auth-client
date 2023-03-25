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
import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';


@Component({
  selector: 'app-user-card-settings',
  templateUrl: './user-card-settings.component.html',
  styleUrls: ['./user-card-settings.component.scss']
})
export class UserCardSettingsComponent {
  isLoading$: Observable<boolean>;
  isLoadSuccess$: Observable<boolean>;

  //Form 
  form: FormGroup;
  formValidation: FormControlStatus;

  createdAt: number;

  constructor(private store: Store, private dialog: MatDialog, private actionsSubject: ActionsSubject, private route: ActivatedRoute, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(fromUserAction.userSettingsLoadRequest({ userId: this.route.parent?.snapshot.params['userId'] as string }))
    this.isLoading$ = this.store.pipe(select(fromUserSelector.isUserSettingsLoading));
    this.isLoadSuccess$ = this.store.pipe(select(fromUserSelector.isUserSettingsLoadedSuccess));
    this.store.select(fromUserSelector.getUserSettingsData).subscribe((data)=> { if(data)  this.initializeValue(data) });
    this.actionsSubject.pipe(ofType(fromUserAction.userSettingsUpdateSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User settings updated.")}));
      this.store.dispatch(fromUserAction.userSettingsLoadRequest({ userId: this.route.parent?.snapshot.params['userId'] as string }));
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      isEnabled: [false, Validators.required],
      isUserNonLocked:  [false, Validators.required],
      isCredentialsNonExpired: [false, Validators.required],
      isUserNonExpired: [false, Validators.required],
    });
    this.form.statusChanges.subscribe(val => this.formValidation = val);
  }

  initializeValue(data: fromUserTypes.UserSettingsInterface): void {
        this.createdAt=data.createdAt;
        this.form.get("userName")?.setValue(data.userName);
        this.form.get("isEnabled")?.setValue(data.isEnabled);
        this.form.get("isUserNonLocked")?.setValue(data.isUserNonLocked);  
        this.form.get("isCredentialsNonExpired")?.setValue(data.isCredentialsNonExpired);
        this.form.get("isUserNonExpired")?.setValue(data.isUserNonExpired);   
  }

  update(){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: "Update user",
        message: `Update user settings?`,
        level: fromSharedTypes.ConfirmDialogLevelEnum.accent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromUserAction.userSettingsUpdateRequest({
          userId: this.route.parent?.snapshot.params['userId'] as string, 
          payload: {
            userName: this.form.value.userName,
            isEnabled: this.form.value.isEnabled,
            isUserNonLocked: this.form.value.isUserNonLocked,
            isCredentialsNonExpired: this.form.value.isCredentialsNonExpired,
            isUserNonExpired: this.form.value.isUserNonExpired
          }
      }))
      }});
  }
}
