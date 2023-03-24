import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { CallbackComponent } from './components/callback/callback.component';

//App reducer
import { reducer } from './store/identity.reducer';

//App effects
import { IdentityEffects } from './store/identity.effect';

//App services
import { AuthGuardWithForcedLoginService } from './services/auth-guard-with-forced-login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

//App config
import * as fromIdenityConfig from './identity.config';




@NgModule({
  declarations: [
    CallbackComponent
  ],
  imports: [
    SharedModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
 //         allowedUrls: ['http://192.168.0.101:8080'],
          sendAccessToken: true         
        }
      }
    ),
    StoreModule.forFeature('identity', reducer),
    EffectsModule.forFeature(
      [
        IdentityEffects
      ]
    )
  ],
  providers: [
    AuthGuardWithForcedLoginService,
    AuthGuardService,
    AuthService,
    { provide: OAuthStorage, useValue: localStorage },
  ],
  exports: [

  ]
  
})
export class IdentityModule {}