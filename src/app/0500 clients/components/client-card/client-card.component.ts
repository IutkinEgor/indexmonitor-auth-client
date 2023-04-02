import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

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
