import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-loyalty',
  templateUrl: 'loyalty.html',
})
export class LoyaltyPage {
  user_details;
  points;
  redeemable_amount;


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

    
    this.user_details = this.navParams.get("user_details");
    this.points = this.navParams.get("points");
    this.redeemable_amount = this.navParams.get("redeemable_amount");
    console.log("Points is  " + this.points )
  }

  redeem() {

    


    let confirm = this.alertCtrl.create({
      title: "Redeem Points",
      message:
        "You are about to redeem your loyalty points. Use your points in your next order",
      

      buttons: [
        {
          text: "No",
          handler: () => { },
        },
        {
          text: "Continue",
          handler: () => {
            

          this.navCtrl.setRoot("HomePage", { customer_details: this.user_details })
          }
          
        }
      ],
    });
    confirm.present();

  }
      }
