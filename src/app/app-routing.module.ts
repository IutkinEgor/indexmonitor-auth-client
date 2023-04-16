import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Auth guard
import { AuthGuardService } from './0200 identity/services/auth-guard.service';

//Application Components
import { CallbackComponent } from './0200 identity/components/callback/callback.component';
import { HomeComponent } from './0300 common/components/home/home.component';
import { FaqComponent } from './0300 common/components/faq/faq.component';
import { WelcomeComponent } from './0300 common/components/welcome/welcome.component';
import { ClientCardScopeSettingsComponent } from './0500 clients/components/client-card-scope-settings/client-card-scope-settings.component';
import { ClientCardSettingsComponent } from './0500 clients/components/client-card-settings/client-card-settings.component';
import { ClientCardTokenSettingsComponent } from './0500 clients/components/client-card-token-settings/client-card-token-settings.component';
import { ClientCardComponent } from './0500 clients/components/client-card/client-card.component';
import { ClientComponent } from './0500 clients/components/client/client.component';
import { ScopeCardComponent } from './0600 scopes/components/scope-card/scope-card.component';
import { ScopeSettingsComponent } from './0600 scopes/components/scope-settings/scope-settings.component';
import { ScopeUsageByClientsComponent } from './0600 scopes/components/scope-usage-by-clients/scope-usage-by-clients.component';
import { ScopeComponent } from './0600 scopes/components/scope/scope.component';
import { UserCardAuthoritiesComponent } from './0700 users/components/user-card-authorities/user-card-authorities.component';
import { UserCardProfileComponent } from './0700 users/components/user-card-profile/user-card-profile.component';
import { UserCardRolesComponent } from './0700 users/components/user-card-roles/user-card-roles.component';
import { UserCardSettingsComponent } from './0700 users/components/user-card-settings/user-card-settings.component';
import { UserCardComponent } from './0700 users/components/user-card/user-card.component';
import { UserComponent } from './0700 users/components/user/user.component';
import { RoleCardComponent } from './0800 roles/components/role-card/role-card.component';
import { RoleSettingsComponent } from './0800 roles/components/role-settings/role-settings.component';
import { RoleComponent } from './0800 roles/components/role/role.component';
import { RoleUsageByUsersComponent } from './0800 roles/components/role-usage-by-users/role-usage-by-users.component';
import { AuthorityComponent } from './0900 authorities/components/authority/authority.component';
import { AuthorityCardComponent } from './0900 authorities/components/authority-card/authority-card.component';
import { AuthoritySettingsComponent } from './0900 authorities/components/authority-settings/authority-settings.component';
import { AuthorityUsageByUsersComponent } from './0900 authorities/components/authority-usage-by-users/authority-usage-by-users.component';



const routes: Routes = [
  {    path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {    path: 'welcome', component: WelcomeComponent, pathMatch: 'full'  },
  {    path: 'faq', component: FaqComponent, pathMatch: 'full'  },
  {    path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuardService]  },
  {    path: 'auth/callback', component: CallbackComponent, pathMatch: 'full'}, 
  {    path: 'clients', component: ClientComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  {    path: 'clients/:clientId', component: ClientCardComponent, canActivate: [AuthGuardService], children: [
      {    path: '', redirectTo: 'client-settings', pathMatch: 'full' },
      {    path: 'client-settings', component: ClientCardSettingsComponent },
      {    path: 'token-settings', component: ClientCardTokenSettingsComponent },
      {    path: 'scopes', component: ClientCardScopeSettingsComponent },
  ] },
  {    path: 'scopes', component: ScopeComponent, canActivate: [AuthGuardService], pathMatch: 'full'}, 
  {    path: 'scopes/:scopeId', component: ScopeCardComponent, canActivate: [AuthGuardService], children: [
      {    path: '', redirectTo: 'scope-settings', pathMatch: 'full' },
      {    path: 'scope-settings', component: ScopeSettingsComponent },
      {    path: 'clients', component: ScopeUsageByClientsComponent },
  ]},  
  {    path: 'users', component: UserComponent, canActivate: [AuthGuardService], pathMatch: 'full'}, 
  {    path: 'users/:userId', component: UserCardComponent, canActivate: [AuthGuardService], children: [
      {    path: '', redirectTo: 'settings', pathMatch: 'full' },
      {    path: 'settings', component: UserCardSettingsComponent },
      {    path: 'profile', component: UserCardProfileComponent },
      {    path: 'roles', component: UserCardRolesComponent },
      {    path: 'authorities', component: UserCardAuthoritiesComponent },
  ]}, 
  {    path: 'roles', component: RoleComponent, canActivate: [AuthGuardService], pathMatch: 'full'}, 
  {    path: 'roles/:roleId', component: RoleCardComponent, canActivate: [AuthGuardService], children: [
      {    path: '', redirectTo: 'settings', pathMatch: 'full' },
      {    path: 'settings', component: RoleSettingsComponent },
      {    path: 'users', component: RoleUsageByUsersComponent },
  ]}, 
  {    path: 'authorities', component: AuthorityComponent, canActivate: [AuthGuardService], pathMatch: 'full'}, 
  {    path: 'authorities/:authorityId', component: AuthorityCardComponent, children: [
      {    path: '', redirectTo: 'settings', pathMatch: 'full' },
      {    path: 'settings', component: AuthoritySettingsComponent },
      {    path: 'users', component: AuthorityUsageByUsersComponent },
  ]},  
  {    path: '**', redirectTo: '/home' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
