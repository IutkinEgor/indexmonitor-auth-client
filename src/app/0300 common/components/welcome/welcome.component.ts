import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectServerDialogComponent } from 'src/app/0100 shared/components/connect-server-dialog/connect-server-dialog.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {


  constructor(
    private dialog: MatDialog) {
    }

  connect(): void {
    this.dialog.open(ConnectServerDialogComponent);
  }
}
