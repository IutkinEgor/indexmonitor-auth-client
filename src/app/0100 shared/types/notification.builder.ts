import { AriaLivePoliteness } from "@angular/cdk/a11y";
import { Direction } from "@angular/cdk/bidi";
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export class NotificationData {
    header: string | undefined;
    message: string;

    constructor(message: string){
        this.message = message;
    }

    public static build(message: string, header?: string): NotificationData{
        return {
            header: header,
            message: message,
        }
    }

    public static buildPayload(message: string, header?: string){
        return { payload: this.build(message,header) }
    }
}

export class NotificationBuilder {
    private static DURATION = 5000;
    private static DIRECTION: Direction = 'ltr';
    private static POLITENESS: AriaLivePoliteness = 'polite';
    private static HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = 'center';
    private static VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';
    
    public static withDefault(data: NotificationData){
        var config = new MatSnackBarConfig<NotificationData>;
        config.duration = NotificationBuilder.DURATION;
        config.direction = NotificationBuilder.DIRECTION;
        config.politeness = NotificationBuilder.POLITENESS;
        config.horizontalPosition = NotificationBuilder.HORIZONTAL_POSITION;
        config.verticalPosition = NotificationBuilder.VERTICAL_POSITION;
        config.data = data;
        config.panelClass = ['notify'];
        return config;
    }
}