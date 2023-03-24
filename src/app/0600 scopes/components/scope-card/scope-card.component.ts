import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromSharedUtils from '../../../0100 shared/utils/_index';

import * as fromScopeTypes from '../../../0600 scopes/types/_index';
import * as fromScopeAction from '../../../0600 scopes/store/scope.action';
import * as fromScopeSelector from '../../../0600 scopes/store/scope.selector';
import { ofType } from '@ngrx/effects';



@Component({
  selector: 'app-scope-card',
  templateUrl: './scope-card.component.html',
  styleUrls: ['./scope-card.component.scss']
})
export class ScopeCardComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  id: string;
  createdAt: string;
  createdBy: string;
  //scope$: Observable<fromScopeTypes.ScopePageInterface | undefined> ;

  constructor(private route: ActivatedRoute, private store: Store){}

  ngOnInit(): void {
    console.log("Init card")
    this.id = this.route.snapshot.paramMap.get('scopeId') as string;
    this.store.pipe(select(fromScopeSelector.getPageElementById(this.route.snapshot.paramMap.get('scopeId') as string))).subscribe((data) => {
        if(data){
          this.createdBy = data.createdBy;
          this.createdAt = fromSharedUtils.TimestampConverter.fromMilliseconds(data.createdAt);
        }     
      }     
    );
  }

}
