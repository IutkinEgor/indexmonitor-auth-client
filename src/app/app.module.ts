import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

//App Modules
import { SharedModule } from './0100 shared/shared.module';
import { IdentityModule } from './0200 identity/identity.module';
import { CommonModule } from './0300 common/common.module';
import { ClientModule } from './0500 clients/client.module';
import { ScopeModule } from './0600 scopes/scope.module';
import { UserModule } from './0700 users/user.module';
import { RoleModule } from './0800 roles/roles.module';
import { AuthorityModule } from './0900 authorities/authority.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //NGRX
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? 
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }) : [],
    StoreRouterConnectingModule.forRoot(),

    //App Modules default
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //App Modules
    SharedModule,
    IdentityModule,
    CommonModule,
    ClientModule,
    ScopeModule,
    UserModule,
    RoleModule,
    AuthorityModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
