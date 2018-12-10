import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, CartService, CartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  cartList: Array<CartItem>;
  check: any;

  order_id: any;
  user_details: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    this.order_id = this.navParams.get("order_id")
    this.user_details = this.navParams.get("user_details")
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

  order(){

    let alert = this.alertCtrl.create({
          title: "Oopps!",
          subTitle: "Feature not available",
          buttons: ['OK']
        });
        alert.present();

  }

}
