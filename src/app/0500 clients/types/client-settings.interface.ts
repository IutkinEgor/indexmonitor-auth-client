export interface ClientSettingsInterface {
    id: string;
    clientId: string;
    createdAt: number;
    name: string;
    description: string;
    authenticationMethods: Set<string>;
    authorizationGrantTypes: Set<string>;
    origin: string;
    redirectUris: Set<string>;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
}