import { BooleanInput } from '@angular/cdk/coercion';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';

import * as fromIdentitySelector from './0200 identity/store/identity.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-temp-am-ngrx';
  componentMode: MatDrawerMode = 'side'
  componentToggle: BooleanInput;

  screenSizeBreakpoint$: Observable<Boolean>;
  isAuthenticated$: Observable<boolean>;
  openSidebar$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {
    this.screenSizeBreakpoint$ = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
      map(breakpoint => {
        if(breakpoint.matches){
          this.componentMode = 'over';
          return false;
        }
        else{
          this.componentMode = 'side';
          return true;
        }
      }),
      distinctUntilChanged()
    );
    this.isAuthenticated$ = this.store.pipe(select(fromIdentitySelector.isAuthenticatedSelector));    

    this.openSidebar$ = combineLatest([this.screenSizeBreakpoint$,this.isAuthenticated$]).pipe(
     map(([bool1, bool2]) => this.componentToggle = !!(bool1 && bool2))
    );

    this.openSidebar$.subscribe(toggle => this.componentToggle = !!toggle);
  }
}
