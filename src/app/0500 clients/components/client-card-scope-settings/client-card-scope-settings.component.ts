import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClientCardScopeAddDialogComponent } from '../client-card-scope-add-dialog/client-card-scope-add-dialog.component';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromClientAction from '../../store/client.action';
import * as fromClientSelector from '../../../0500 clients/store/client.selector';

@Component({
  selector: 'app-client-card-scope-settings',
  templateUrl: './client-card-scope-settings.component.html',
  styleUrls: ['./client-card-scope-settings.component.scss']
})
export class ClientCardScopeSettingsComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  constructor(private route: ActivatedRoute,  private dialog: MatDialog, private cdr: ChangeDetectorRef, private store: Store,private actionsSubject: ActionsSubject, private formBuilder: FormBuilder){}

  dataSource: MatTableDataSource<fromClientTypes.ClientScopeInterface>;
  noData: fromClientTypes.ClientScopeInterface[] = [<fromClientTypes.ClientScopeInterface>{}];
  modelEdit: fromClientTypes.ClientScopeInterface;
  tableColumns: string[] = [
    'scopeId',
    'scopeName',
    'details',
    'remove'
  ];

  clientScopes: fromClientTypes.ClientScopeInterface[] = [];

  ngOnInit(): void {
    this.store.dispatch(fromClientAction.clientScopesLoadRequest({ id: this.route.parent?.snapshot.paramMap.get('clientId') as string }))
    this.isLoading$ = this.store.pipe(select(fromClientSelector.isScopesLoading));
    this.isLoadedSuccess$ = this.store.pipe(select(fromClientSelector.isScopesLoadedSuccess));
    this.store.pipe(select(fromClientSelector.getScopesData))
      .subscribe((data) =>  { if(data) { 
        this.clientScopes = data;
        this.initializeTable(data);
       } });

    this.actionsSubject.pipe(ofType(fromClientAction.clientScopesRemoveSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("Client scopes was removed") }));
        this.store.dispatch(fromClientAction.clientScopesLoadRequest({ id: this.route.parent?.snapshot.paramMap.get('clientId') as string }));
      });
  }

  initializeTable(data: fromClientTypes.ClientScopeInterface[]){
      this.dataSource = new MatTableDataSource(
        data.length ? data : this.noData
      );
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  add(){
    let dialogRef = this.dialog.open(ClientCardScopeAddDialogComponent, {
      //width: '100%',
      minWidth: '250px',
      data: { id: this.route.parent?.snapshot.paramMap.get('clientId') as string }   
    });  
  }

  remove(id: string, scopeName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Remove scope",
      message: `Are you sure you want to remove the scope "${scopeName}" from client?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromClientAction.clientScopesRemoveRequest({
          clientId: this.route.parent?.snapshot.paramMap.get('clientId') as string,
          scopeId: id   
        }))
      }
    })
  }
}
