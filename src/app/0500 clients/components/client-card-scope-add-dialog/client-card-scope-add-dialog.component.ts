import { Component, Inject, ViewChild } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientCardAction from '../../../0500 clients/store/client-card/client-card.action';
import * as fromClientCardSelector from '../../../0500 clients/store/client-card/client-card.selector';

import * as fromScopeTypes from '../../../0600 scopes/types/_index';
import * as fromScopeAction from '../../../0600 scopes/store/scope.action';
import * as fromScopeSelector from '../../../0600 scopes/store/scope.selector';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-card-scope-add-dialog',
  templateUrl: './client-card-scope-add-dialog.component.html',
  styleUrls: ['./client-card-scope-add-dialog.component.scss']
})
export class ClientCardScopeAddDialogComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isClientScopesLoading$: Observable<boolean>;
  isClientScopesLoadedSuccess$: Observable<boolean>;

  isAllScopesLoading$: Observable<boolean>;
  isAllScopesLoadedSuccess$: Observable<boolean>;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  selectedList: string[] = new Array<string>;

  constructor(private route: ActivatedRoute, private store: Store, private actionsSubject: ActionsSubject, private dialogRef: MatDialogRef<ClientCardScopeAddDialogComponent>,  @Inject(MAT_DIALOG_DATA) private data: { id: string }){}

  dataSource: MatTableDataSource<fromClientTypes.ClientScopeInterface>;
  noData: fromClientTypes.ClientScopeInterface[] = [<fromClientTypes.ClientScopeInterface>{}];
  modelEdit: fromClientTypes.ClientScopeInterface;
  tableColumns: string[] = [
    'id',
    'name',
    'add'
  ];

  clientScopes: fromClientTypes.ClientScopeInterface[];
  registeredScopes: fromScopeTypes.ScopePageInterface[];
  avalibleScopes: fromClientTypes.ClientScopeInterface[];

  ngOnInit(): void {
    this.store.dispatch(fromScopeAction.scopePageLoadRequest({ page: 0, size: 100 }));

    this.isClientScopesLoading$ = this.store.pipe(select(fromClientCardSelector.isScopesLoading));
    this.isClientScopesLoadedSuccess$ = this.store.pipe(select(fromClientCardSelector.isScopesLoadedSuccess));
    this.isAllScopesLoading$ = this.store.pipe(select(fromScopeSelector.isTableLoading));
    this.isAllScopesLoadedSuccess$ = this.store.pipe(select(fromScopeSelector.isTableLoadedSuccess));

    this.isLoading$ = combineLatest([this.isClientScopesLoading$,this.isAllScopesLoading$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );
    this.isLoadedSuccess$ = combineLatest([this.isClientScopesLoadedSuccess$,this.isAllScopesLoadedSuccess$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );

    this.store.pipe(select(fromClientCardSelector.getScopesData))
      .subscribe((data) =>  { if(data) { 
        this.clientScopes = data;
       } });

    this.store.pipe(select(fromScopeSelector.getTableData)).subscribe(data => {
      if(!data) return;
      this.avalibleScopes = data.filter((item) => {
        return !this.clientScopes.some((other) => {
          return item.id === other.id;
        });
      });
      this.initializeTable(this.avalibleScopes);
    });

    this.actionsSubject.pipe(ofType(fromClientCardAction.clientScopesAddSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client scopes was added") }));
      this.store.dispatch(fromClientCardAction.clientScopesLoadRequest({ id: this.data.id }));
      this.dialogRef.close();
  });
  }
  
  initializeTable(data: fromClientTypes.ClientScopeInterface[]){
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
    this.store.dispatch(fromClientCardAction.clientScopesAddRequest({id: this.data.id, payload: {
      scopeIds: this.selectedList
    }}))
  }
}
