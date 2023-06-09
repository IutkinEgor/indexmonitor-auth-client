import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ClientRegisterDialogComponent } from '../client-register-dialog/client-register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientAction from '../../store/client.action'
import * as fromClientSelector from '../../../0500 clients/store/client.selector';
import * as fromClientRegisterAction from '../../../0500 clients/store/client.action';


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
  //table: Object | null;

  //Tabel
  pageSize: number = 10;
  pageIndex: number = 0;
  totalCount: number = 0;
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
    this.store.dispatch(fromClientAction.clientPageLoadRequest({page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromClientSelector.isClientPageLoading));
    this.isSuccess$ = this.store.pipe(select(fromClientSelector.isClientPageSuccess));
    this.store.pipe(select(fromClientSelector.getClientPageTotalCount)).subscribe((data) =>  { if(data) this.totalCount = data});
    this.store.pipe(select(fromClientSelector.getClientPageData)).subscribe((data) =>  { if(data) this.initializeTable(data) });
    this.actionsSubject.pipe(ofType(fromClientAction.clientDeleteSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client was deleted") }));
      this.store.dispatch(fromClientAction.clientPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
    this.actionsSubject.pipe(ofType(fromClientRegisterAction.clientRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client registered") }));
      this.store.dispatch(fromClientAction.clientPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
  }


  initializeTable(data: fromClientTypes.ClientTableInterface[]){
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  loadPage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(fromClientAction.clientPageLoadRequest({page: event.pageIndex, size: event.pageSize}))
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
        this.store.dispatch(fromClientAction.clientDeleteRequest({id}));
      }
    })
  }
}
