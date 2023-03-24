import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';

@Component({
  selector: 'app-user-card-profile',
  templateUrl: './user-card-profile.component.html',
  styleUrls: ['./user-card-profile.component.scss']
})
export class UserCardProfileComponent {
  isLoading$: Observable<boolean>;
  isLoadSuccess$: Observable<boolean>;

  //Form 
  form: FormGroup;
  formValidation: FormControlStatus;

  constructor(private store: Store, private actionsSubject: ActionsSubject, private route: ActivatedRoute, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(fromUserAction.userProfileLoadRequest({ userId: this.route.parent?.snapshot.params['userId'] as string }))
    this.isLoading$ = this.store.pipe(select(fromUserSelector.isUserProfileLoading));
    this.isLoadSuccess$ = this.store.pipe(select(fromUserSelector.isUserProfileLoadedSuccess));
    this.store.select(fromUserSelector.getUserProfileData).subscribe((data)=> { if(data)  this.initializeValue(data) });
    // this.actionsSubject.pipe(ofType(fromUserAction.userProfileUpdateSuccess)).subscribe(() => {
    //   this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User Profile updated.")}));
    //   this.store.dispatch(fromUserAction.userProfileLoadRequest({ userId: this.route.parent?.snapshot.params['userId'] as string }));
    // });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      email:  ['', Validators.required],
      emailConfirmed: ['', Validators.required],
    });
    this.form.disable();
    this.form.statusChanges.subscribe(val => this.formValidation = val);
  }

  initializeValue(data: fromUserTypes.UserProfileInterface): void {
        this.form.get("givenName")?.setValue(data.givenName);
        this.form.get("familyName")?.setValue(data.familyName);
        this.form.get("email")?.setValue(data.email);  
        this.form.get("emailConfirmed")?.setValue(data.emailConfirmed);
  }
}
