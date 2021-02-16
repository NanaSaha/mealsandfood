import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringItemDetailsPage } from './catering-item-details';

@NgModule({
  declarations: [
    CateringItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringItemDetailsPage),
  ],
})
export class CateringItemDetailsPageModule {}
