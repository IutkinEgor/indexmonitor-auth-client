import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';

//App Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConnectServerDialogComponent } from './components/connect-server-dialog/connect-server-dialog.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

//App directives
import * as fromDirectives from '../0010 directives/_index';

//App interceptors
import { ErrorResponseInterceptor } from '../0011 interceptors/error-response.interceptor';

//Shared Services
import { WindowSizeService } from './services/window-size.service';
import { NotificationSnackbarService } from './services/notification-snackbar.service';

//App reducer
import { reducer } from './store/shared.reducer';

//App effects
import { SharedEffects } from './store/shared.effect';



@NgModule({
  declarations: [
    // App Components
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ConnectServerDialogComponent,
    NotificationSnackbarComponent,
    DummyComponent,
    ConfirmDialogComponent,
    // App Directives
    fromDirectives.TmpDirective,

  ],
  imports: [
    //Angular Core
    RouterModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //Angular Material
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    DragDropModule,
    MatListModule,
    MatStepperModule,
    //NGRX
    StoreModule.forFeature('shared', reducer),
    EffectsModule.forFeature(
      [
        SharedEffects
      ]
    )
  ],
  exports: [
    // App Components
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    NotificationSnackbarComponent,
    ConfirmDialogComponent,
    // App Directives
    fromDirectives.TmpDirective,
    //Angular Core
    RouterModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //Angular Material
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    DragDropModule,
    MatListModule,
    MatStepperModule,
  ],
  providers: [
    //Shared Services
    WindowSizeService,
    NotificationSnackbarService,
    ConfirmDialogComponent,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        panelClass: ['notify']
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    }
  ],
})
export class SharedModule {}
