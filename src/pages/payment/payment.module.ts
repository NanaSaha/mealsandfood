import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
    Angular4PaystackModule
  ],
})
export class PaymentPageModule {}
