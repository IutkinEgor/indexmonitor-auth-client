import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ClientRegisterDialogComponent } from '../client-register-dialog/client-register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientTableAction from '../../../0500 clients/store/client-table/client-table.action'
import * as fromClientTableSelector from '../../../0500 clients/store/client-table/client-table.selector';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit  {
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;
  isFailure$: Observable<boolean>;
  table: Object | null;

  //Tabel
  pageSize: number = 10;
  dataSource: MatTableDataSource<fromClientTypes.ClientTableInterface>;
  noData: fromClientTypes.ClientTableInterface[] = [<fromClientTypes.ClientTableInterface>{}];
  modelEdit: fromClientTypes.ClientTableInterface;
  tableColumns: string[] = [
    'id',
    'clientId',
    'name',
    'origin',
    'details',
    'delete',
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private actionsSubject: ActionsSubject
  ){}

  ngOnInit(): void {
    this.store.dispatch(fromClientTableAction.clientPageLoadRequest({page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromClientTableSelector.isLoading));
    this.isSuccess$ = this.store.pipe(select(fromClientTableSelector.isSuccess));
    this.isFailure$ = this.store.pipe(select(fromClientTableSelector.isFailure));
    this.store
      .pipe(select(fromClientTableSelector.getData))
      .subscribe((data) => this.initializeTable(data));
      this.actionsSubject.pipe(ofType(fromClientTableAction.clientDeleteSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client was deleted") }));
        this.store.dispatch(fromClientTableAction.clientPageLoadRequest({page: 0, size: 20}));
      });
  }


  initializeTable(data: fromClientTypes.ClientTableInterface[] | null){
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
    this.store.dispatch(fromClientTableAction.clientPageLoadRequest({page: event.pageIndex, size: event.pageSize}))
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  register(): void {
    let dialogRef = this.dialog.open(ClientRegisterDialogComponent, {
      enterAnimationDuration: 0
    });   
  }
  delete(id: string, clientName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Delete client",
      message: `Are you sure you want to delete the client "${clientName}" with ID "${id}"?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromClientTableAction.clientDeleteRequest({id}));
      }
    })
  }
}
