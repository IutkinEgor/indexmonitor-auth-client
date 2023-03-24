import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserCardRolesAddDialogComponent } from '../user-card-roles-add-dialog/user-card-roles-add-dialog.component';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';

@Component({
  selector: 'app-user-card-roles',
  templateUrl: './user-card-roles.component.html',
  styleUrls: ['./user-card-roles.component.scss']
})
export class UserCardRolesComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  constructor(private route: ActivatedRoute,  private dialog: MatDialog, private cdr: ChangeDetectorRef, private store: Store,private actionsSubject: ActionsSubject, private formBuilder: FormBuilder){}

  dataSource: MatTableDataSource<fromUserTypes.UserRoleInterface>;
  noData: fromUserTypes.UserRoleInterface[] = [<fromUserTypes.UserRoleInterface>{}];
  modelEdit: fromUserTypes.UserRoleInterface;
  tableColumns: string[] = [
    'roleId',
    'roleName',
    'details',
    'remove'
  ];

  userRoles: fromUserTypes.UserRoleInterface[] = [];

  ngOnInit(): void {
    this.store.dispatch(fromUserAction.userRolesLoadRequest({ userId: this.route.parent?.snapshot.paramMap.get('userId') as string }))
    this.isLoading$ = this.store.pipe(select(fromUserSelector.isUserRolesLoading));
    this.isLoadedSuccess$ = this.store.pipe(select(fromUserSelector.isUserRolesLoadedSuccess));
    this.store.pipe(select(fromUserSelector.getUserRolesData))
      .subscribe((data) =>  { if(data) { 
        this.userRoles = data;
        this.initializeTable(data);
       } });

    this.actionsSubject.pipe(ofType(fromUserAction.userRolesRemoveSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User role was removed") }));
        this.store.dispatch(fromUserAction.userRolesLoadRequest({ userId: this.route.parent?.snapshot.paramMap.get('userId') as string }));
      });
  }

  initializeTable(data: fromUserTypes.UserRoleInterface[]){
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
    let dialogRef = this.dialog.open(UserCardRolesAddDialogComponent, {
      //width: '100%',
      minWidth: '250px',
      data: { id: this.route.parent?.snapshot.paramMap.get('userId') as string }   
    });  
  }

  remove(roleId: string, roleName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Remove role",
      message: `Are you sure you want to remove the role "${roleName}" from user?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromUserAction.userRolesRemoveRequest({
          userId: this.route.parent?.snapshot.paramMap.get('userId') as string,
          roleId: roleId   
        }))
      }
    })
  }
}
