import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringPaymentPage } from './catering-payment';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [
    CateringPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringPaymentPage),
    Angular4PaystackModule
  ],
})
export class CateringPaymentPageModule {}
