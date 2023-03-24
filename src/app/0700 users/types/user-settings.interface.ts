export interface UserSettingsInterface {
    id: string;
    userName: string;
    isUserNonExpired: boolean;
    isUserNonLocked: boolean;
    isCredentialsNonExpired: boolean;
    isEnabled: boolean;
}

export interface UserSettingsUpdateInterface {
    userName: string;
    isUserNonExpired: boolean;
    isUserNonLocked: boolean;
    isCredentialsNonExpired: boolean;
    isEnabled: boolean;
}