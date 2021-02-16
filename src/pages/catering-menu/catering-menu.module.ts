import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringMenuPage } from './catering-menu';

@NgModule({
  declarations: [
    CateringMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringMenuPage),
  ],
})
export class CateringMenuPageModule {}
