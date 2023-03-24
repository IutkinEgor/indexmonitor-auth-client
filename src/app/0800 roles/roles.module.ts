import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { RoleComponent } from './components/role/role.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { RoleCardComponent } from './components/role-card/role-card.component';
import { RoleSettingsComponent } from './components/role-settings/role-settings.component';
import { RoleUsageByUsersComponent } from './components/role-usage-by-users/role-usage-by-users.component';
import { RoleRegisterDialogComponent } from './components/role-register-dialog/role-register-dialog.component';

//App services
import { RoleService } from './services/role.service';

//App reducer
import { reducer } from './store/role.reducer';

//App effects
import { RoleEffects } from './store/role.effect';



@NgModule({
  declarations: [
    RoleComponent,
    RoleTableComponent,
    RoleCardComponent,
    RoleSettingsComponent,
    RoleUsageByUsersComponent,
    RoleRegisterDialogComponent,  
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('role', reducer),
    EffectsModule.forFeature(
      [
        RoleEffects
      ]
    )
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }
