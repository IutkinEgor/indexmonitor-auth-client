import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ScopeRegisterDialogComponent } from '../scope-register-dialog/scope-register-dialog.component';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromScopeType from '../../types/_index';
import * as fromScopeAction from '../../store/scope.action';
import * as fromScopeSelector from '../../store/scope.selector';


@Component({
  selector: 'app-scope-table',
  templateUrl: './scope-table.component.html',
  styleUrls: ['./scope-table.component.scss']
})
export class ScopeTableComponent {
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  pageSize: number = 10;
  dataSource: MatTableDataSource<fromScopeType.ScopePageInterface>;
  noData: fromScopeType.ScopePageInterface[] = [<fromScopeType.ScopePageInterface>{}];
  modelEdit: fromScopeType.ScopePageInterface;
  tableColumns: string[] = [
    'id',
    'name',
    'createdAt',
    'details',
    'delete',
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private actionsSubject: ActionsSubject
  ){}

  ngOnInit(): void {
    this.store.dispatch(fromScopeAction.scopePageLoadRequest({page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromScopeSelector.isTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromScopeSelector.isTableLoadedSuccess));
    this.store.pipe(select(fromScopeSelector.getTableData)).subscribe((data) => this.initializeTable(data));
    
    this.actionsSubject.pipe(ofType(fromScopeAction.scopeDeleteSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Scopes was deleted") }));
      this.store.dispatch(fromScopeAction.scopePageLoadRequest({ page: 0, size: 20 }));
    });
  }

  initializeTable(data: fromScopeType.ScopePageInterface[] | null){
    if (data != null) {
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
  loadPage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.store.dispatch(fromScopeAction.scopePageLoadRequest({page: event.pageIndex, size: event.pageSize}))
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  register(): void {
    let dialogRef = this.dialog.open(ScopeRegisterDialogComponent, { minWidth: '300px' });  
  }

  delete(id: string, scopeName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Delete scope",
      message: `Are you sure you want to delete the scope "${scopeName}" with ID "${id}"?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromScopeAction.scopeDeleteRequest({id}));
      }
    })
  }
}
