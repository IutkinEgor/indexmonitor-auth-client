import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ScopeRegisterDialogComponent } from '../scope-register-dialog/scope-register-dialog.component';
import { ActivatedRoute } from '@angular/router';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromScopeType from '../../types/_index';
import * as fromScopeAction from '../../store/scope.action';
import * as fromScopeSelector from '../../store/scope.selector';


@Component({
  selector: 'app-scope-usage-by-clients',
  templateUrl: './scope-usage-by-clients.component.html',
  styleUrls: ['./scope-usage-by-clients.component.scss']
})
export class ScopeUsageByClientsComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  dataSource: MatTableDataSource<fromScopeType.ScopeUsageByClientInterface>;
  noData: fromScopeType.ScopeUsageByClientInterface[] = [<fromScopeType.ScopeUsageByClientInterface>{}];
  modelEdit: fromScopeType.ScopeUsageByClientInterface;
  tableColumns: string[] = [
    'id',
    'clientId',
    'name',
    'navigate',
  ];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private actionsSubject: ActionsSubject,
    
  ){}

  ngOnInit(): void {
    this.store.dispatch(fromScopeAction.scopeUsageByClientsLoadRequest({scopeId:  this.route.snapshot.paramMap.get('id') as string}));
    this.isLoading$ = this.store.pipe(select(fromScopeSelector.isTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromScopeSelector.isTableLoadedSuccess));
    this.store.pipe(select(fromScopeSelector.getUsageByClientData)).subscribe((data) =>  { if(data) this.initializeTable(data) } );
  }

  initializeTable(data: fromScopeType.ScopeUsageByClientInterface[]){
    if (data != null) {
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
