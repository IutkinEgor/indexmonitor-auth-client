import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { UserCardAuthoritiesAddDialogComponent } from '../user-card-authorities-add-dialog/user-card-authorities-add-dialog.component';
import { ConfirmDialogComponent } from 'src/app/0100 shared/components/confirm-dialog/confirm-dialog.component';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';

import * as fromUserTypes from '../../types/_index';
import * as fromUserAction from '../../store/user.action';
import * as fromUserSelector from '../../store/user.selector';

@Component({
  selector: 'app-user-card-authorities',
  templateUrl: './user-card-authorities.component.html',
  styleUrls: ['./user-card-authorities.component.scss']
})
export class UserCardAuthoritiesComponent {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  constructor(private route: ActivatedRoute,  private dialog: MatDialog,  private cdr: ChangeDetectorRef, private store: Store,private actionsSubject: ActionsSubject, private formBuilder: FormBuilder){}

  dataSource: MatTableDataSource<fromUserTypes.UserAuthorityInterface>;
  noData: fromUserTypes.UserAuthorityInterface[] = [<fromUserTypes.UserAuthorityInterface>{}];
  modelEdit: fromUserTypes.UserAuthorityInterface;
  tableColumns: string[] = [
    'authorityId',
    'authorityName',
    'details',
    'remove'
  ];

  userAuthorities: fromUserTypes.UserAuthorityInterface[];

  ngOnInit(): void {
    this.store.dispatch(fromUserAction.userAuthoritiesLoadRequest({ userId: this.route.parent?.snapshot.paramMap.get('userId') as string }))
    this.isLoading$ = this.store.pipe(select(fromUserSelector.isUserAuthoritiesLoading));
    this.isLoadedSuccess$ = this.store.pipe(select(fromUserSelector.isUserAuthoritiesLoadedSuccess));
    this.store.pipe(select(fromUserSelector.getUserAuthoritiesData))
      .subscribe((data) =>  { if(data) { 
        this.userAuthorities = data;
        this.initializeTable(data);
       } });

    this.actionsSubject.pipe(ofType(fromUserAction.userAuthoritiesRemoveSuccess)).subscribe(() => {
        this.store.dispatch(fromSharedAction.notificationSuccess({ payload: fromSharedTypes.NotificationData.build("User authority was removed") }));
        this.store.dispatch(fromUserAction.userAuthoritiesLoadRequest({ userId: this.route.parent?.snapshot.paramMap.get('userId') as string }));
      });
  }

  initializeTable(data: fromUserTypes.UserAuthorityInterface[]){
    console.log(data);
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
    let dialogRef = this.dialog.open(UserCardAuthoritiesAddDialogComponent, { minWidth: '300px',
      data: { id: this.route.parent?.snapshot.paramMap.get('userId') as string }   
    });  
  }

  remove(authorityId: string, authorityName: string){
    var data: fromSharedTypes.ConfirmDialogInterface = {
      header: "Remove authority",
      message: `Are you sure you want to remove the authority "${authorityName}" from user?`,
      level: fromSharedTypes.ConfirmDialogLevelEnum.warn
    }

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(fromUserAction.userAuthoritiesRemoveRequest({
          userId: this.route.parent?.snapshot.paramMap.get('userId') as string,
          authorityId: authorityId   
        }))
      }
    })
  }
}
