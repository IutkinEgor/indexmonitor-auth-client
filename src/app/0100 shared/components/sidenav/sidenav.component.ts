import { Component } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(){}

  register(){
    window.location.href = `${localStorage.getItem("issuer")}/register?redirectUrl=${location.origin}`;
  }
}
