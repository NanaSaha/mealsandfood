import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringOrderDetailsPage } from './catering-order-details';

@NgModule({
  declarations: [
    CateringOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringOrderDetailsPage),
  ],
})
export class CateringOrderDetailsPageModule {}
