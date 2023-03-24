import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthorityRegisterDialogComponent } from '../authority-register-dialog/authority-register-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromAuthorityType from '../../types/_index';
import * as fromAuthorityAction from '../../store/authority.action';
import * as fromAuthoritySelector from '../../store/authority.selector';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-authority-table',
  templateUrl: './authority-table.component.html',
  styleUrls: ['./authority-table.component.scss']
})
export class AuthorityTableComponent {
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  pageSize: number = 10;
  pageIndex: number = 0;
  totalCount: number = 0;
  dataSource: MatTableDataSource<fromAuthorityType.AuthorityPageInterface>;
  noData: fromAuthorityType.AuthorityPageInterface[] = [<fromAuthorityType.AuthorityPageInterface>{}];
  modelEdit: fromAuthorityType.AuthorityPageInterface;
  tableColumns: string[] = [
    'authorityId',
    'authorityName',
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
    this.store.dispatch(fromAuthorityAction.authorityPageLoadRequest({page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromAuthoritySelector.isAuthorityTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromAuthoritySelector.isAuthorityTableLoadedSuccess));
    this.store.pipe(select(fromAuthoritySelector.getAuthorityTableTotalCount)).subscribe((data) =>  { if(data) this.totalCount = data});
    this.store.pipe(select(fromAuthoritySelector.getAuthorityTableData)).subscribe((data) => { if(data) this.initializeTable(data)});
    this.actionsSubject.pipe(ofType(fromAuthorityAction.authorityRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromAuthorityAction.authorityPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
    this.actionsSubject.pipe(ofType(fromAuthorityAction.authorityDeleteSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Authoritys was deleted") }));
      this.store.dispatch(fromAuthorityAction.authorityPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
  }

  initializeTable(data: fromAuthorityType.AuthorityPageInterface[]){
    this.dataSource = new MatTableDataSource(
      data.length ? data : this.noData
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  loadPage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(fromAuthorityAction.authorityPageLoadRequest({page: event.pageIndex, size: event.pageSize}));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  register(): void {
    let dialogRef = this.dialog.open(AuthorityRegisterDialogComponent, { minWidth: '300px' });
  }

  delete(authorityId: string,authorityName: string){ 
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Delete authority",
      message: `Are you sure you want to delete the authority "${authorityName}" with ID "${authorityId}"?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromAuthorityAction.authorityDeleteRequest({authorityId}));
      }
    })
  }
}
