export interface ClientSettingsUpdateInterface {
    clientId: string;
    name: string;
    description: string;
    authenticationMethods: Array<string>;
    authorizationGrantTypes: Array<string>;
    origin: string;
    redirectUris: Array<string>;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
}