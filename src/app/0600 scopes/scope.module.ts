import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { ScopeComponent } from './components/scope/scope.component';
import { ScopeTableComponent } from './components/scope-table/scope-table.component';
import { ScopeCardComponent } from './components/scope-card/scope-card.component';
import { ScopeSettingsComponent } from './components/scope-settings/scope-settings.component';
import { ScopeUsageByClientsComponent } from './components/scope-usage-by-clients/scope-usage-by-clients.component';
import { ScopeRegisterDialogComponent } from './components/scope-register-dialog/scope-register-dialog.component';

//App services
import { ScopeService } from './services/scope.service';

//App reducer
import { reducer } from './store/scope.reducer';

//App effects
import { ScopeEffects } from './store/scope.effect';



@NgModule({
  declarations: [
    ScopeComponent,
    ScopeTableComponent,
    ScopeCardComponent,
    ScopeSettingsComponent,
    ScopeUsageByClientsComponent,
    ScopeRegisterDialogComponent,  
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('scope', reducer),
    EffectsModule.forFeature(
      [
        ScopeEffects
      ]
    )
  ],
  providers: [
    ScopeService
  ]
})
export class ScopeModule { }
