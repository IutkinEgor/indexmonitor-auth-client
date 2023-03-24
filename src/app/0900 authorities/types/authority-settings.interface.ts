
export interface AuthoritySettingsInterface {
    id: string;
    createdAt: number;
    createdBy: string;
    name: string;
    description: string;
    isEnable: boolean;
    isObtainable: boolean;
}

export interface AuthoritySettingsUpdateInterface {
    name: string;
    description: string;
    isEnable: boolean;
    isObtainable: boolean;
}