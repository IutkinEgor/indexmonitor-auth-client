import { Component, Inject, ViewChild } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromUserTypes from '../../../0700 users/types/_index';
import * as fromUserAction from '../../../0700 users/store/user.action';
import * as fromUserSelector from '../../../0700 users/store/user.selector';

import * as fromRolesTypes from '../../../0800 roles/types/_index';
import * as fromRolesAction from '../../../0800 roles/store/role.action';
import * as fromRolesSelector from '../../../0800 roles/store/role.selector';


@Component({
  selector: 'app-user-card-roles-add-dialog',
  templateUrl: './user-card-roles-add-dialog.component.html',
  styleUrls: ['./user-card-roles-add-dialog.component.scss']
})
export class UserCardRolesAddDialogComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isUserRolesLoading$: Observable<boolean>;
  isUserRolesLoadedSuccess$: Observable<boolean>;

  isAllRolesLoading$: Observable<boolean>;
  isAllRolesLoadedSuccess$: Observable<boolean>;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  selectedList: string[] = new Array<string>;

  constructor(private route: ActivatedRoute, private store: Store, private actionsSubject: ActionsSubject, private dialogRef: MatDialogRef<UserCardRolesAddDialogComponent>,  @Inject(MAT_DIALOG_DATA) private data: { id: string }){}

  pageSize: number = 10;
  dataSource: MatTableDataSource<fromUserTypes.UserRoleInterface>;
  noData: fromUserTypes.UserRoleInterface[] = [<fromUserTypes.UserRoleInterface>{}];
  modelEdit: fromUserTypes.UserRoleInterface;
  tableColumns: string[] = [
    'roleId',
    'roleName',
    'add'
  ];

  userRoles: fromUserTypes.UserRoleInterface[];
  avalibleRoles: fromUserTypes.UserRoleInterface[];

  ngOnInit(): void {
    this.store.dispatch(fromRolesAction.rolePageLoadRequest({page: 0, size: 100}));

    this.isUserRolesLoading$ = this.store.pipe(select(fromUserSelector.isUserRolesLoading));
    this.isUserRolesLoadedSuccess$ = this.store.pipe(select(fromUserSelector.isUserRolesLoadedSuccess));
    this.isAllRolesLoading$ = this.store.pipe(select(fromRolesSelector.isRoleTableLoading));
    this.isAllRolesLoadedSuccess$ = this.store.pipe(select(fromRolesSelector.isRoleTableLoadedSuccess));

    this.isLoading$ = combineLatest([this.isUserRolesLoading$,this.isAllRolesLoading$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );
    this.isLoadedSuccess$ = combineLatest([this.isUserRolesLoadedSuccess$,this.isAllRolesLoadedSuccess$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );

    this.store.pipe(select(fromUserSelector.getUserRolesData))
      .subscribe((data) =>  { if(data) { 
        this.userRoles = data;
       } });

    this.store.pipe(select(fromRolesSelector.getRoleTableData)).subscribe(data => {
      if(!data) return;
      this.avalibleRoles = data.filter((page) => !this.userRoles.some((role) => role.roleId === page.roleId)).map( role =>  { return {roleId: role.roleId, roleName: role.roleName} });
      this.initializeTable(this.avalibleRoles);
    });

    this.actionsSubject.pipe(ofType(fromUserAction.userRolesAddSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User role was added") }));
      this.store.dispatch(fromUserAction.userRolesLoadRequest({ userId: this.data.id }));
      this.dialogRef.close();
  });
  }
  
  initializeTable(data: fromUserTypes.UserRoleInterface[]){
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  loadPage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.store.dispatch(fromRolesAction.rolePageLoadRequest({page: event.pageIndex, size: event.pageSize}))
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(id: string){
    this.selectedList.push(id);
  }

  remove(id: string){
    const index = this.selectedList.indexOf(id);
    if (index !== -1) {
      this.selectedList.splice(index, 1);
    }
  }

  confirm(){
    this.store.dispatch(fromUserAction.userRolesAddRequest({userId: this.data.id, roleIds: this.selectedList }))
  }
}
