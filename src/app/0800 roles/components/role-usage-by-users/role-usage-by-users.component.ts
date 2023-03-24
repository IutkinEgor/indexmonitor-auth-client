import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RoleRegisterDialogComponent } from '../role-register-dialog/role-register-dialog.component';
import { ActivatedRoute } from '@angular/router';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromRoleType from '../../types/_index';
import * as fromRoleAction from '../../store/role.action';
import * as fromRoleSelector from '../../store/role.selector';


@Component({
  selector: 'app-role-usage-by-users',
  templateUrl: './role-usage-by-users.component.html',
  styleUrls: ['./role-usage-by-users.component.scss']
})
export class RoleUsageByUsersComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  dataSource: MatTableDataSource<fromRoleType.RoleUsageByUsersInterface>;
  noData: fromRoleType.RoleUsageByUsersInterface[] = [<fromRoleType.RoleUsageByUsersInterface>{}];
  modelEdit: fromRoleType.RoleUsageByUsersInterface;
  tableColumns: string[] = [
    'id',
    'userId',
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
    this.store.dispatch(fromRoleAction.roleUsageByUsersLoadRequest({roleId:  this.route.snapshot.paramMap.get('roleId') as string}));
    this.isLoading$ = this.store.pipe(select(fromRoleSelector.isRoleTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromRoleSelector.isRoleTableLoadedSuccess));
    this.store.pipe(select(fromRoleSelector.getRoleUsageByUsersData)).subscribe((data) =>  { if(data) this.initializeTable(data) } );
  }

  initializeTable(data: fromRoleType.RoleUsageByUsersInterface[]){
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
