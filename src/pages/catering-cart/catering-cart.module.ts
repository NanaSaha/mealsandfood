import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringCartPage } from './catering-cart';

@NgModule({
  declarations: [
    CateringCartPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringCartPage),
  ],
})
export class CateringCartPageModule {}
