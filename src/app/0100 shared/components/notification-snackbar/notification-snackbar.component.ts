import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';

import * as fromSharedTypes from '../../types/_index';
import * as fromSharedSelector from '../../store/shared.selector'


@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent {

  message: string;

  constructor(public snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: fromSharedTypes.NotificationData) {
    this.message = data.message;
  }

  

}
