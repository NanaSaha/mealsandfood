import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, FoodCartService, FoodCartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-food-cart',
  templateUrl: 'food-cart.html',
})
export class FoodCartPage {

  cartList: Array<FoodCartItem>;
  check: any;
  params: any;
  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  order_id: any;
  user_details: any;

  jsonBody: any;
  body: any;
  user_id: any;
  body2: any;
  address_details: any;
  address_user_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: FoodCartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.user_details = this.navParams.get("user_details")
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)

    let loader = this.loadingCtrl.create({
      content: "Getting Cart Details ..."

    });

    loader.present();

    // Checking if user has address already
    this.params = {
      "user_id": this.user_id
    }

    this.apis.retrieve_address_details(this.params).then((result) => {
      this.body2 = result;
      this.address_details = JSON.stringify(this.body2)
      this.address_user_id = this.body2[0]
      this.address_user_id.user_id
      console.log(this.body2)
      console.log(this.address_details)
      console.log("USER ID " + this.address_user_id.user_id )
      console.log("RESP CODE " + this.address_user_id.resp_code )

    });

    // retrieving all the cart items

    this.cartList = cartServ.getAllCartfoodItems();
    console.log("CARTLIST IN FOOD CART" + this.cartList)
    this.select = JSON.stringify(this.cartList)
    loader.dismiss();

  }



  quantityAdd(item) {
    this.cartServ.quantityPlus(item);
  }

  quantityMinus(item) {
    if (item.quantity > 1) {
      this.cartServ.quantityMinus(item);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Quantity is 1, you cant reduce it, if you want to remove, please press remove button.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }


  removeItemFromCart(item) {
    //this.cartService.removeItemById(item.id);

    let self = this;

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to remove food item from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Buy clicked');
            self.cartServ.removeItemById(item.id);
          }
        }
      ]
    });
    alert.present();

  }


  getTotal(): number {
    this.check = this.cartServ.getGrandTotal()
    return this.cartServ.getGrandTotal();
  }



  checkout(item) {


        if (this.address_user_id.user_id > 0) { 
          this.navCtrl.push("FoodCheckoutPage",

          { user_details: this.user_details ,order_id: this.order_id});

        }
         else {
          this.navCtrl.push("AddressPage",{ order_id: this.order_id,user_details: this.user_details });

        }



   }

}
