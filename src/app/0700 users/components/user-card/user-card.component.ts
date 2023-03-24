import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import * as fromUserSelector from '../../store/user.selector'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  isLoading$: Observable<boolean>;
  isLoadedSuccess$: Observable<boolean>;

  id: string;

  constructor(private route: ActivatedRoute, private store: Store){}

  ngOnInit(): void {
    console.log("Init card")
    this.id = this.route.snapshot.paramMap.get('userId') as string;
  }
}
