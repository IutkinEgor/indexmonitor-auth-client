export interface ClientTokenSettingsInterface {
    authorizationCodeTimeToLive: number;
    accessTokenTimeToLive: number;
    refreshTokenTimeToLive: number;
    reuseRefreshTokens: boolean;
}