import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  //issuer: 'http://192.168.0.101:8888',
  //clientId: 'angular_ui_none', 
  responseType: 'code', // The "Auth Code + PKCE" client
  redirectUri: window.location.origin + '/auth/callback',
  scope: 'openid profile',
  strictDiscoveryDocumentValidation: false,
  sessionChecksEnabled: false,
  showDebugInformation: true, 
  clearHashAfterLogin: true,
  requireHttps: false,
};

