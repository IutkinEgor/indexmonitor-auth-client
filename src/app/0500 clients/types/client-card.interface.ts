export interface ClientCardInterface {
    id: string;
    clientId: string;
    clientIdIssuedAt: number;
    name: string;
    description: string;
    authenticationMethods: Set<string>;
    authorizationGrantTypes: Set<string>;
    origin: string;
    redirectUris: Set<string>;
    scopes: Set<string>;
    authorizationCodeTimeToLive: number;
    accessTokenTimeToLive: number;
    refreshTokenTimeToLive: number;
    reuseRefreshTokens: boolean;
    tokenSignatureAlgorithm: string;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
}