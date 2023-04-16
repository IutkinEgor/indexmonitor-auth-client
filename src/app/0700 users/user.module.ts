import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { UserComponent } from './components/user/user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCardSettingsComponent } from './components/user-card-settings/user-card-settings.component';
import { UserCardProfileComponent } from './components/user-card-profile/user-card-profile.component';
import { UserCardAuthoritiesComponent } from './components/user-card-authorities/user-card-authorities.component';
import { UserCardRolesComponent } from './components/user-card-roles/user-card-roles.component';
import { UserCardRolesAddDialogComponent } from './components/user-card-roles-add-dialog/user-card-roles-add-dialog.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserRegisterDialogComponent } from './components/user-register-dialog/user-register-dialog.component';
import { UserCardAuthoritiesAddDialogComponent } from './components/user-card-authorities-add-dialog/user-card-authorities-add-dialog.component';


//App services
import { UserService } from './services/user.service';

//App reducer
import { reducer } from './store/user.reducer';

//App effects
import { UserEffects } from './store/user.effect';




@NgModule({
  declarations: [
    UserComponent,
    UserCardComponent,
    UserCardSettingsComponent,
    UserCardProfileComponent,
    UserCardAuthoritiesComponent,
    UserCardAuthoritiesAddDialogComponent,
    UserCardRolesComponent,
    UserCardRolesAddDialogComponent,
    UserTableComponent,
    UserRegisterDialogComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature(
      [
        UserEffects
      ]
    )
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
