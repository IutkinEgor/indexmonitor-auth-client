export interface OAuth2ConfigInterface {
    clientId: string;
    issuer: string;
    redirectUri: URL;
    scope: string[];
    responseType: string;
  }
  