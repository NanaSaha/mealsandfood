import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodPaymentPage } from './food-payment';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [
    FoodPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPaymentPage),
    Angular4PaystackModule
  ],
})
export class FoodPaymentPageModule {}
