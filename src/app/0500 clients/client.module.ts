import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { ClientComponent } from './components/client/client.component';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { ClientCardSettingsComponent } from './components/client-card-settings/client-card-settings.component';
import { ClientCardTokenSettingsComponent } from './components/client-card-token-settings/client-card-token-settings.component';
import { ClientCardScopeSettingsComponent } from './components/client-card-scope-settings/client-card-scope-settings.component';
import { ClientRegisterDialogComponent } from './components/client-register-dialog/client-register-dialog.component';
import { ClientTableComponent } from './components/client-table/client-table.component';

//App services
import { ClientService } from './services/client.service';

//App reducer
import { reducers } from './store/client.reducer';

//App effects
import { ClientCardEffects } from './store/client-card/client-card.effect';
import { ClientRegisterEffects } from './store/client-register/client-register.effect';
import { ClientTableEffects } from './store/client-table/client-table.effect';
import { ClientCardScopeAddDialogComponent } from './components/client-card-scope-add-dialog/client-card-scope-add-dialog.component';




@NgModule({
  declarations: [
    ClientComponent,
    ClientCardComponent,
    ClientCardSettingsComponent,
    ClientCardTokenSettingsComponent,
    ClientCardScopeSettingsComponent,
    ClientTableComponent,
    ClientRegisterDialogComponent,
    ClientCardScopeAddDialogComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('client', reducers),
    EffectsModule.forFeature(
      [
        ClientCardEffects,
        ClientRegisterEffects,
        ClientTableEffects
      ]
    )
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }
