import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { AuthorityComponent } from './components/authority/authority.component';
import { AuthorityTableComponent } from './components/authority-table/authority-table.component';
import { AuthorityCardComponent } from './components/authority-card/authority-card.component';
import { AuthoritySettingsComponent } from './components/authority-settings/authority-settings.component';
import { AuthorityUsageByUsersComponent } from './components/authority-usage-by-users/authority-usage-by-users.component';
import { AuthorityRegisterDialogComponent } from './components/authority-register-dialog/authority-register-dialog.component';

//App services
import { AuthorityService } from './services/authority.service';

//App reducer
import { reducer } from './store/authority.reducer';

//App effects
import { AuthorityEffects } from './store/authority.effect';



@NgModule({
  declarations: [
    AuthorityComponent,
    AuthorityTableComponent,
    AuthorityCardComponent,
    AuthoritySettingsComponent,
    AuthorityUsageByUsersComponent,
    AuthorityRegisterDialogComponent,  
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('authority', reducer),
    EffectsModule.forFeature(
      [
        AuthorityEffects
      ]
    )
  ],
  providers: [
    AuthorityService
  ]
})
export class AuthorityModule { }
