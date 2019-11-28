import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodPaymentPage } from './food-payment';

@NgModule({
  declarations: [
    FoodPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPaymentPage),
  ],
})
export class FoodPaymentPageModule {}
