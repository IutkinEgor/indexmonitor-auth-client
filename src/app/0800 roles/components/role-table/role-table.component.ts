import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RoleRegisterDialogComponent } from '../role-register-dialog/role-register-dialog.component';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromRoleType from '../../types/_index';
import * as fromRoleAction from '../../store/role.action';
import * as fromRoleSelector from '../../store/role.selector';


@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent {
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  pageSize: number = 10;
  pageIndex: number = 0;
  totalCount: number = 0;
  dataSource: MatTableDataSource<fromRoleType.RolePageInterface>;
  noData: fromRoleType.RolePageInterface[] = [<fromRoleType.RolePageInterface>{}];
  modelEdit: fromRoleType.RolePageInterface;
  tableColumns: string[] = [
    'roleId',
    'roleName',
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
    this.store.dispatch(fromRoleAction.rolePageLoadRequest({page: 0, size: 20}));
    this.isLoading$ = this.store.pipe(select(fromRoleSelector.isRoleTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromRoleSelector.isRoleTableLoadedSuccess));
    this.store.pipe(select(fromRoleSelector.getRoleTableTotalCount)).subscribe((data) =>  { if(data) this.totalCount = data});
    this.store.pipe(select(fromRoleSelector.getRoleTableData)).subscribe((data) =>  { if(data) this.initializeTable(data)});
    this.actionsSubject.pipe(ofType(fromRoleAction.roleRegisterSuccess)).subscribe(() => {
      this.store.dispatch(fromRoleAction.rolePageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
    this.actionsSubject.pipe(ofType(fromRoleAction.roleDeleteSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Roles was deleted") }));
      this.store.dispatch(fromRoleAction.rolePageLoadRequest({page: this.pageIndex, size: this.pageSize}));
    });
  }

  initializeTable(data: fromRoleType.RolePageInterface[]){
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  loadPage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.store.dispatch(fromRoleAction.rolePageLoadRequest({page: event.pageIndex, size: event.pageSize}));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  register(): void {
    let dialogRef = this.dialog.open(RoleRegisterDialogComponent, { minWidth: '300px' });
  }

  delete(roleId: string, roleName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Delete role",
      message: `Are you sure you want to delete the role "${roleName}" with ID "${roleId}"?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromRoleAction.roleDeleteRequest({roleId}));
      }
    })
  }
}
