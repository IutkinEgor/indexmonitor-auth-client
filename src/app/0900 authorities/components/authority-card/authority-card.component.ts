import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authority-card',
  templateUrl: './authority-card.component.html',
  styleUrls: ['./authority-card.component.scss']
})
export class AuthorityCardComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  id: string;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('authorityId') as string;
  }

}
