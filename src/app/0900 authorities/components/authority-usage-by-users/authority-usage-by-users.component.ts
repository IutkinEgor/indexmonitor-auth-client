import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthorityRegisterDialogComponent } from '../authority-register-dialog/authority-register-dialog.component';
import { ActivatedRoute } from '@angular/router';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromAuthorityType from '../../types/_index';
import * as fromAuthorityAction from '../../store/authority.action';
import * as fromAuthoritySelector from '../../store/authority.selector';


@Component({
  selector: 'app-authority-usage-by-users',
  templateUrl: './authority-usage-by-users.component.html',
  styleUrls: ['./authority-usage-by-users.component.scss']
})
export class AuthorityUsageByUsersComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  dataSource: MatTableDataSource<fromAuthorityType.AuthorityUsageByUsersInterface>;
  noData: fromAuthorityType.AuthorityUsageByUsersInterface[] = [<fromAuthorityType.AuthorityUsageByUsersInterface>{}];
  modelEdit: fromAuthorityType.AuthorityUsageByUsersInterface;
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
    this.store.dispatch(fromAuthorityAction.authorityUsageByUsersLoadRequest({authorityId:  this.route.snapshot.paramMap.get('authorityId') as string}));
    this.isLoading$ = this.store.pipe(select(fromAuthoritySelector.isAuthorityTableLoading));
    this.isSuccess$ = this.store.pipe(select(fromAuthoritySelector.isAuthorityTableLoadedSuccess));
    this.store.pipe(select(fromAuthoritySelector.getAuthorityUsageByUsersData)).subscribe((data) =>  { if(data) this.initializeTable(data) } );
  }

  initializeTable(data: fromAuthorityType.AuthorityUsageByUsersInterface[]){
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
