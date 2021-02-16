import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringlistPage } from './cateringlist';

@NgModule({
  declarations: [
    CateringlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringlistPage),
  ],
})
export class CateringlistPageModule {}
