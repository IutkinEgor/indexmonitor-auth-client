import { NgModule } from '@angular/core';

//App modules
import { SharedModule } from '../0100 shared/shared.module';

//App components
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { WelcomeComponent } from './components/welcome/welcome.component';



@NgModule({
  declarations: [
    HomeComponent,
    FaqComponent,
    WelcomeComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class CommonModule { }
