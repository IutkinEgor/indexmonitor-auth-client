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
import { ClientCardScopeAddDialogComponent } from './components/client-card-scope-add-dialog/client-card-scope-add-dialog.component';

//App services
import { ClientService } from './services/client.service';

//App reducer
import { reducer } from './store/client.reducer';

//App effects
import { ClientEffects } from './store/client.effect';



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
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature(
      [
        ClientEffects
      ]
    )
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }
