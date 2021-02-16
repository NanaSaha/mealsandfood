import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringCheckoutPage } from './catering-checkout';

@NgModule({
  declarations: [
    CateringCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringCheckoutPage),
  ],
})
export class CateringCheckoutPageModule {}
