export interface ClientRegisterInterface {
    clientId: string;
    secret: string | null;
    name: string;
    description: string;
    authenticationMethods: Array<string>;
    authorizationGrantTypes: Array<string>;
    origin: string;
    redirectUris: Array<string>;
}