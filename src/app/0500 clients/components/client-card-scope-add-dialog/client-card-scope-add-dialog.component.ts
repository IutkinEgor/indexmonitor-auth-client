import { Component, Inject, ViewChild } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientAction from '../../store/client.action';
import * as fromClientSelector from '../../../0500 clients/store/client.selector';

import * as fromScopeAction from '../../../0600 scopes/store/scope.action';
import * as fromScopeSelector from '../../../0600 scopes/store/scope.selector';


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
    'scopeId',
    'scopeName',
    'add'
  ];

  clientScopes: fromClientTypes.ClientScopeInterface[];
  avalibleScopes: fromClientTypes.ClientScopeInterface[];

  ngOnInit(): void {
    this.store.dispatch(fromScopeAction.scopePageLoadRequest({ page: 0, size: 100 }));

    this.isClientScopesLoading$ = this.store.pipe(select(fromClientSelector.isScopesLoading));
    this.isClientScopesLoadedSuccess$ = this.store.pipe(select(fromClientSelector.isScopesLoadedSuccess));
    this.isAllScopesLoading$ = this.store.pipe(select(fromScopeSelector.isTableLoading));
    this.isAllScopesLoadedSuccess$ = this.store.pipe(select(fromScopeSelector.isTableLoadedSuccess));

    this.isLoading$ = combineLatest([this.isClientScopesLoading$,this.isAllScopesLoading$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );
    this.isLoadedSuccess$ = combineLatest([this.isClientScopesLoadedSuccess$,this.isAllScopesLoadedSuccess$]).pipe(
      map(([bool1, bool2]) => bool1 && bool2)
    );

    this.store.pipe(select(fromClientSelector.getScopesData))
      .subscribe((data) =>  { if(data) { 
        this.clientScopes = data;
       } });

    this.store.pipe(select(fromScopeSelector.getTableData)).subscribe(data => {
      if(!data) return;
      this.avalibleScopes = data.filter((page) => !this.clientScopes.some((scope) => scope.scopeId === page.scopeId)).map( scope =>  { return {scopeId: scope.scopeId, scopeName: scope.scopeName} });
      this.initializeTable(this.avalibleScopes);
    });

    this.actionsSubject.pipe(ofType(fromClientAction.clientScopesAddSuccess)).subscribe(() => {
      this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client scopes was added") }));
      this.store.dispatch(fromClientAction.clientScopesLoadRequest({ id: this.data.id }));
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
    this.store.dispatch(fromClientAction.clientScopesAddRequest({id: this.data.id, payload: {
      scopeIds: this.selectedList
    }}))
  }
}
