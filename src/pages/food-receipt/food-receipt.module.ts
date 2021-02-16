import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodReceiptPage } from './food-receipt';

@NgModule({
  declarations: [
    FoodReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodReceiptPage),
  ],
})
export class FoodReceiptPageModule {}
