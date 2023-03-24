
export interface RoleSettingsInterface {
    id: string;
    createdAt: number;
    createdBy: string;
    name: string;
    description: string;
    isEnable: boolean;
    isObtainable: boolean;
}

export interface RoleSettingsUpdateInterface {
    name: string;
    description: string;
    isEnable: boolean;
    isObtainable: boolean;
}