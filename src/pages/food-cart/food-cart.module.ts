import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodCartPage } from './food-cart';

@NgModule({
  declarations: [
    FoodCartPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodCartPage),
  ],
})
export class FoodCartPageModule {}
