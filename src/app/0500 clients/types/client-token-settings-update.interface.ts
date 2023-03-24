export interface ClientTokenSettingsUpdateInterfcae {
    authorizationCodeTimeToLive: number;
    accessTokenTimeToLive: number;
    refreshTokenTimeToLive: number;
    reuseRefreshTokens: boolean;
}