import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { NotificationSnackbarComponent } from "../components/notification-snackbar/notification-snackbar.component";

import * as fromSharedTypes from '../types/_index';



@Injectable()
export class NotificationSnackbarService {

    constructor(private _snackBar: MatSnackBar){}


    info(data: fromSharedTypes.NotificationData){
        var config: MatSnackBarConfig = fromSharedTypes.NotificationBuilder.withDefault(data);
        config.panelClass = 'info-snackbar';
        this._snackBar.openFromComponent(NotificationSnackbarComponent, config);  
    }

    success(data: fromSharedTypes.NotificationData){
        var config: MatSnackBarConfig = fromSharedTypes.NotificationBuilder.withDefault(data);
        config.panelClass = 'success-snackbar';
        this._snackBar.openFromComponent(NotificationSnackbarComponent, config);  
    }

    error(data: fromSharedTypes.NotificationData){
        var config: MatSnackBarConfig = fromSharedTypes.NotificationBuilder.withDefault(data);
        config.panelClass = 'error-snackbar';
        this._snackBar.openFromComponent(NotificationSnackbarComponent, config);  
    }   
}
