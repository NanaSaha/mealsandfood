import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, CartService, CartItem  } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  cartList: Array<CartItem>;
  
  check: any;
  jsonBody: any;
  body: any;
  user_id: any;
  order_id: any;
  user_details: any;
  momo_network: any;
  total_amount;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.order_id = this.navParams.get("order_id")
    this.user_details = this.navParams.get("user_details")
    this.momo_network = this.navParams.get("momo_network")
    this.total_amount = this.navParams.get("total_amount")

    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)
    console.log("momo_network " + this.momo_network)
    console.log("total_amount " + this.total_amount)



    this.cartList = cartServ.getAllCartItems();
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

    // let alert = this.alertCtrl.create({
    //       title: "Oopps!",
    //       subTitle: "Feature not available",
    //       buttons: ['OK']
    //     });
    //     alert.present();

  }

}
