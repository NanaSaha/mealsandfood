import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodOrderDetailsPage } from './food-order-details';

@NgModule({
  declarations: [
    FoodOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodOrderDetailsPage),
  ],
})
export class FoodOrderDetailsPageModule {}
