import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, UserInfo} from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { AuthenticationRequestInterface } from '../types/authentication-request.interface';
import { CookieService } from 'ngx-cookie-service';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromIdenityTypes from '../../0200 identity/types/_index';
import * as fromSharedAction from '../../0100 shared/store/shared.action';

import * as fromIdentityAction from '../store/identity.action';
import * as fromIdenityConfig from '../identity.config';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(
    private store: Store,
    private oauthService: OAuthService,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
    ) { 
      //this.oauthService.setStorage(localStorage);
      this.initializeSubscribtion();
      if(this.oauthService.hasValidAccessToken()){
        this.onSuccess();
      }
  }

  initializeSubscribtion(){
    this.oauthService.events.subscribe( event => {
      console.log("OAuth event type: " + event.type); 
      if(event.type == 'discovery_document_loaded'){
        this.store.dispatch(fromIdentityAction.discoveryDocumentLoaded());
      }
      if(event.type == 'discovery_document_load_error'){ 
        this.store.dispatch(fromIdentityAction.discoveryDocumentLoadedError());
        this.oauthService.logOut();
      }
      if(event.type == 'discovery_document_validation_error'){
        this.store.dispatch(fromIdentityAction.discoveryDocumentValidationError());
        this.oauthService.logOut();
      }
      if(event.type == 'user_profile_loaded'){   
        var payload: UserInfo = this.oauthService.getIdentityClaims() as UserInfo;
        this.store.dispatch(fromIdentityAction.userProfileLoaded({payload}));
      }
      if(event.type == 'user_profile_load_error'){
        this.store.dispatch(fromIdentityAction.userProfileLoadedError());
      }
      if(event.type == 'jwks_load_error'){
        this.store.dispatch(fromIdentityAction.jwksLoadError());
      }
      if(event.type == 'invalid_nonce_in_state'){
        this.store.dispatch(fromIdentityAction.invalidNonceInState());
      }
      if(event.type == 'code_error'){
        this.store.dispatch(fromIdentityAction.codeError());
        this.oauthService.logOut();
      }
      if(event.type == 'token_expires'){
        this.store.dispatch(fromIdentityAction.tokenExpires());
        this.oauthService.logOut();
      }
      if(event.type == 'token_received'){
        this.store.dispatch(fromIdentityAction.tokenReceived());
        this.oauthService.loadUserProfile();
      }
      if(event.type == 'token_error'){
        this.store.dispatch(fromIdentityAction.tokenError());
        this.oauthService.logOut();
      }
      if(event.type == 'token_refreshed'){
        this.store.dispatch(fromIdentityAction.tokenRefreshed());
      }
      if(event.type == 'token_refresh_error'){
        this.store.dispatch(fromIdentityAction.tokenRefreshError());
        this.navigateToHome();
      }
      if(event.type == 'token_validation_error'){
        this.store.dispatch(fromIdentityAction.tokenValidationError());
      }
      if(event.type == 'silently_refreshed'){
        this.store.dispatch(fromIdentityAction.silentyRefreshed());
      }
      if(event.type == 'silent_refresh_error'){
        this.store.dispatch(fromIdentityAction.silentRefreshError());
      }
      if(event.type == 'silent_refresh_timeout'){
        this.store.dispatch(fromIdentityAction.silentRefreshTimeout());
      }
      if(event.type == 'session_changed'){
        this.store.dispatch(fromIdentityAction.sessionChanged());
      }
      if(event.type == 'session_error'){
        this.store.dispatch(fromIdentityAction.sessionError());
        this.navigateToHome()
      }
      if(event.type == 'session_terminated'){
        this.store.dispatch(fromIdentityAction.sessionTerminated());
        this.navigateToHome()
      }
      if(event.type == 'session_unchanged'){
        this.store.dispatch(fromIdentityAction.sessionUnchanged());
      }
      if(event.type == 'logout'){
        this.store.dispatch(fromIdentityAction.logout());
        this.router.navigate(['/welcome']);
      }
      if(event.type == 'popup_closed'){
        this.store.dispatch(fromIdentityAction.popupClosed());
      }
      if(event.type == 'popup_blocked'){
        this.store.dispatch(fromIdentityAction.popupBlocked());
      }
      if(event.type == 'token_revoke_error'){
        this.store.dispatch(fromIdentityAction.tokenRevokeError());
      }
    });
  }

  onSuccess(){
    var payload: UserInfo = this.oauthService.getIdentityClaims() as UserInfo;
    this.store.dispatch(fromIdentityAction.authenticationSuccess());
    this.store.dispatch(fromIdentityAction.userProfileLoaded({payload}));
  } 
  login(request: AuthenticationRequestInterface) { 
    var config: AuthConfig = fromIdenityConfig.authConfig;
    config.issuer = request.issuer;
    config.clientId = request.clientId;
    config.dummyClientSecret = request.clientSecret == null ? undefined : request.clientSecret;
    localStorage.setItem("issuer", request.issuer);
    localStorage.setItem("clientId", request.clientId);
  
    this.oauthService.configure(config);
    this.oauthService.loadDiscoveryDocument().then(()=> this.oauthService.initLoginFlow());
  } 
  logout() { 
    this.oauthService.logOut(); 
    
  }
  callback(){
    var config: AuthConfig = fromIdenityConfig.authConfig;
    config.issuer = new String(localStorage.getItem("issuer")).toString();
    config.clientId = new String(localStorage.getItem("clientId")).toString()

    console.log(config.clientId)
    console.log(config.issuer)
    this.oauthService.configure(config);
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => { this.onSuccess();  this.router.navigate(['/home']);})
      .catch(() => this.router.navigate(['/welcome']));
  }

  navigateToHome() { this.router.navigateByUrl('/home');  }
}