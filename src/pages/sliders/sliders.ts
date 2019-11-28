
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';



@IonicPage()
@Component({
  selector: 'page-sliders',
  templateUrl: 'sliders.html',
})
export class SlidersPage {

  splash = true;
 


constructor(public navCtrl: NavController, public navParams: NavParams) {
}

//    public ngOnInit() {
//         let swiperContainer = this._elementRef.nativeElement.getElementsByClassName('swiper-container')[0];
//         waitRendered(swiperContainer).then(()=>{
//             let swiper = this._slider;
//             swiper.update();
//         });
// }

ionViewDidLoad() {
  setTimeout(() => this.splash = false, 4000);
  console.log('ionViewDidLoad SliderPage');
}


 skip(){
  this.navCtrl.setRoot("LoginPage")
  // this.navCtrl.push(LoginPage) 
}

}

