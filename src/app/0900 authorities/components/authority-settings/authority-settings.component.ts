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
import * as fromAuthorityTypes from '../../../0900 authorities/types/_index';
import * as fromAuthorityAction from '../../../0900 authorities/store/authority.action';
import * as fromAuthoritySelector from '../../../0900 authorities/store/authority.selector';

@Component({
  selector: 'app-authority-settings',
  templateUrl: './authority-settings.component.html',
  styleUrls: ['./authority-settings.component.scss']
})
export class AuthoritySettingsComponent implements OnInit{

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
    this.store.dispatch(fromAuthorityAction.authoritySettingsLoadRequest({ authorityId: this.route.parent?.snapshot.params['authorityId'] as string }))
    this.isLoading$ = this.store.pipe(select(fromAuthoritySelector.isAuthoritySettingsLoading));
    this.isLoadSuccess$ = this.store.pipe(select(fromAuthoritySelector.isAuthoritySettingsLoadedSuccess));
    this.store.select(fromAuthoritySelector.getAuthoritySettingsData).subscribe((data)=> { if(data)  this.initializeValue(data) });
    this.actionsSubject.pipe(ofType(fromAuthorityAction.authoritySettingsUpdateSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Authority updated.")}));
      this.store.dispatch(fromAuthorityAction.authoritySettingsLoadRequest({ authorityId: this.route.parent?.snapshot.params['authorityId'] as string }));
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

  initializeValue(data: fromAuthorityTypes.AuthoritySettingsInterface): void {
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
        header: "Update authority",
        message: `Update authority settings?`,
        level: fromSharedTypes.ConfirmDialogLevelEnum.accent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromAuthorityAction.authoritySettingsUpdateRequest({
          authorityId: this.route.parent?.snapshot.params['authorityId'] as string, 
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
