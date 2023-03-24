import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';
import { UserRegisterDialogComponent } from '../user-register-dialog/user-register-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromUserType from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  pageSize: number = 10;
  pageIndex: number = 0;
  totalCount: number = 0;
  dataSource: MatTableDataSource<fromUserType.UserPageInterface>;
  noData: fromUserType.UserPageInterface[] = [<fromUserType.UserPageInterface>{}];
  modelEdit: fromUserType.UserPageInterface;
  tableColumns: string[] = [
    'id',
    'userName',
    'givenName',
    'familyName',
    'details',
    'delete',
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private actionsSubject: ActionsSubject
  ){}

  ngOnInit(): void {
    this.store.dispatch(fromUserAction.userPageLoadRequest({ page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromUserSelector.isPageLoading));
    this.isLoadedSuccess$ = this.store.pipe(select(fromUserSelector.isPageLoadedSuccess));
    this.store.pipe(select(fromUserSelector.getPageElementsTotalCount)).subscribe((data) =>  { if(data) this.totalCount = data});
    this.store.pipe(select(fromUserSelector.getPageData)).subscribe((data) => this.initializeTable(data));
    this.actionsSubject.pipe(ofType(fromUserAction.userRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromUserAction.userPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
    this.actionsSubject.pipe(ofType(fromUserAction.userDeleteSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User deleted") }));
      this.store.dispatch(fromUserAction.userPageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
  }

  initializeTable(data: fromUserType.UserPageInterface[] | null){
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
    this.pageIndex = event.pageIndex;
    this.store.dispatch(fromUserAction.userPageLoadRequest({page: event.pageIndex, size: event.pageSize}))
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  register(): void {
    let dialogRef = this.dialog.open(UserRegisterDialogComponent, { minWidth: '300px'});   
  }

  delete(userId: string, givenName: string, familyName: string){

    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Delete user",
      message: `Are you sure you want to delete the user "${givenName} ${familyName}" with ID "${userId}"?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
         this.store.dispatch(fromUserAction.userDeleteRequest({userId}));
      }
    })
  }
}
