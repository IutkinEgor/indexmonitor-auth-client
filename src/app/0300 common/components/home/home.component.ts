import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private homeService: HomeService, private router: Router){}

  ngOnInit(){}
  
  navigateTo(url: string){
    this.router.navigate([url]);
  }

}
