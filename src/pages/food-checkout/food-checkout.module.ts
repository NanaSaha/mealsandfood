import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodCheckoutPage } from './food-checkout';

@NgModule({
  declarations: [
    FoodCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodCheckoutPage),
  ],
})
export class FoodCheckoutPageModule {}
