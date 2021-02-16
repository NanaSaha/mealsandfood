import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, FoodCartService, FoodCartItem  } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-food-receipt',
  templateUrl: 'food-receipt.html',
})
export class FoodReceiptPage {
  cartList: Array<FoodCartItem>;
  check: any;
  jsonBody: any;
  body: any;
  user_id: any;
  order_id: any;
  user_details: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: FoodCartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.order_id = this.navParams.get("order_id")
    this.user_details = this.navParams.get("user_details")

    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)



    this.cartList = cartServ.getAllCartfoodItems();
    console.log(this.cartList)
   
  }


  getTotal(): number {
    this.check = this.cartServ.getGrandTotal()
    return this.cartServ.getGrandTotal();
  }

  home(){ 
    this.navCtrl.setRoot("HomePage", {customer_details:this.user_details})

  }

  order_history(){

    this.navCtrl.push("OrderHistoryPage", {customer_details:this.user_details})

  

  }

}
