import { Component, Inject, ViewChild } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';

import * as fromAuthoritiesTypes from '../../../0900 authorities/types/_index';
import * as fromAuthoritiesAction from '../../../0900 authorities/store/authority.action';
import * as fromAuthoritiesSelector from '../../../0900 authorities/store/authority.selector';


@Component({
  selector: 'app-user-card-authorities-add-dialog',
  templateUrl: './user-card-authorities-add-dialog.component.html',
  styleUrls: ['./user-card-authorities-add-dialog.component.scss']
})
export class UserCardAuthoritiesAddDialogComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isUserAuthoritiesLoading$: Observable<boolean>;
  isUserAuthoritiesLoadedSuccess$: Observable<boolean>;

  isAllAuthoritiesLoading$: Observable<boolean>;
  isAllAuthoritiesLoadedSuccess$: Observable<boolean>;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  selectedList: string[] = new Array<string>;

  constructor(private route: ActivatedRoute, private store: Store, private actionsSubject: ActionsSubject, private dialogRef: MatDialogRef<UserCardAuthoritiesAddDialogComponent>,  @Inject(MAT_DIALOG_DATA) private data: { id: string }){}

  dataSource: MatTableDataSource<fromUserTypes.UserAuthorityInterface>;
  noData: fromUserTypes.UserAuthorityInterface[] = [<fromUserTypes.UserAuthorityInterface>{}];
  modelEdit: fromUserTypes.UserAuthorityInterface;
  tableColumns: string[] = [
    'authorityId',
    'authorityName',
    'add'
  ];

  userAuthorities: fromUserTypes.UserAuthorityInterface[];
  avalibleAuthorities: fromUserTypes.UserAuthorityInterface[];

  ngOnInit(): void {
    this.store.dispatch(fromAuthoritiesAction.authorityPageLoadRequest({ page: 0, size: 100}));

    this.isUserAuthoritiesLoading$ = this.store.pipe(select(fromUserSelector.isUserAuthoritiesLoading));
    this.isUserAuthoritiesLoadedSuccess$ = this.store.pipe(select(fromUserSelector.isUserAuthoritiesLoadedSuccess));
    this.isAllAuthoritiesLoading$ = this.store.pipe(select(fromAuthoritiesSelector.isAuthorityTableLoading));
    this.isAllAuthoritiesLoadedSuccess$ = this.store.pipe(select(fromAuthoritiesSelector.isAuthorityTableLoadedSuccess));

    this.isLoading$ = combineLatest([this.isUserAuthoritiesLoading$,this.isAllAuthoritiesLoading$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );
    this.isLoadedSuccess$ = combineLatest([this.isUserAuthoritiesLoadedSuccess$,this.isAllAuthoritiesLoadedSuccess$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );

    this.store.pipe(select(fromUserSelector.getUserAuthoritiesData))
      .subscribe((data) =>  { if(data) { 
        this.userAuthorities = data;
       } });

    this.store.pipe(select(fromAuthoritiesSelector.getAuthorityTableData)).subscribe(data => {
      if(!data) return;
      this.avalibleAuthorities = data.filter((page) => !this.userAuthorities.some((authority) => authority.authorityId === page.authorityId)).map( authority =>  { return {authorityId: authority.authorityId, authorityName: authority.authorityName} });
      this.initializeTable(this.avalibleAuthorities);
    });

    this.actionsSubject.pipe(ofType(fromUserAction.userAuthoritiesAddSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User authority was added") }));
      this.store.dispatch(fromUserAction.userAuthoritiesLoadRequest({ userId: this.data.id }));
      this.dialogRef.close();
  });
  }
  
  initializeTable(data: fromUserTypes.UserAuthorityInterface[]){
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    this.store.dispatch(fromUserAction.userAuthoritiesAddRequest({userId: this.data.id, authorityIds: this.selectedList }))
  }
}
