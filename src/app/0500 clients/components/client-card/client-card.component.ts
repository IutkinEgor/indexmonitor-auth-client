import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLinkActive } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import * as fromSharedTypes from '../../../0100 shared/types/_index';
import * as fromClientTypes from '../../../0500 clients/types/_index';
import * as fromSharedAction from '../../../0100 shared/store/shared.action';
import * as fromClientCardAction from '../../../0500 clients/store/client-card/client-card.action'
import * as fromClientCardSelector from '../../../0500 clients/store/client-card/client-card.selector';


import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id =  this.route.snapshot.paramMap.get('clientId') as string;
  }

}
