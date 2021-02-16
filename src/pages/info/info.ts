import { Component } from '@angular/core';
import { IonicPage, ViewController,NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  dismiss() {
    
    this.viewCtrl.dismiss();
  }
}
