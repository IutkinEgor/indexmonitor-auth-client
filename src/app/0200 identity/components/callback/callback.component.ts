import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent{

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      const state = params['state'];
      //const stateParams = state.split(';');
      //const routeParam = stateParams[1].split(',')[0] as String;
      this.authService.callback();
    });
  }

  
}
