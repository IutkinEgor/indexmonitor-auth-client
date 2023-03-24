export interface ConfirmDialogInterface { 
    header: string;
    message: string;
    level: ConfirmDialogLevelEnum
}

export enum ConfirmDialogLevelEnum{
    basic = 'basic',
    primary = 'primary',
    accent = 'accent',
    warn = 'warn',
}