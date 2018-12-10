import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartsPage } from './carts';

@NgModule({
  declarations: [
    CartsPage,
  ],
  imports: [
    IonicPageModule.forChild(CartsPage),
  ],
})
export class CartsPageModule {}
