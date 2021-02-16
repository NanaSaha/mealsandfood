import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ApisProvider, CartService, CartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
})
export class PaymentHistoryPage {
  cartList: Array<CartItem>;
  user_details;
  jsonBody: any;
  body: any;
  user_id: any;
  params;
  params2: any;
  select: any;
  orders: any;
  paymentJson: any;
  order_id: any;
  list: any;
  list2: any;
  q: any;
  delivered;
  order_history: string = "Meals";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.user_details = this.navParams.get("customer_details")

      //Checking if user data is shown / logged in
      if ( this.user_details == undefined){
        console.log("No Login - NO User Data");
    
  
      }

      else{
      
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)



    this.params = {
      "user_id": this.user_id

    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.apis.payment_history(this.params).then((result) => {

      console.log (result)
      
      this.paymentJson = JSON.stringify(result)
    
      console.log('LETS SEE THE PROCESS ORDER ' + this.paymentJson);  
      this.list = JSON.parse(this.paymentJson)
     

      loader.dismiss();

    }, (err) => {
  
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: "Sorry, cant connect right now. Please try again!",
        buttons: ['OK']
      });
      alert.present();
      loader.dismiss();    
}
);
  }
}


 

}

