import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, FoodCartService, FoodCartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-food-checkout',
  templateUrl: 'food-checkout.html',
})
export class FoodCheckoutPage {
  cartList: Array<FoodCartItem>;
  card: boolean;
  cash: boolean;
  params: any;
  body: any;
  body2: any;
  user_id: any;
  user_details: any;
  jsonBody: any;
  jsonBody2: any;
  address_details: any;
  mobile_number: any;
  check: any;

  order_id: any;

  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  address_user_id: any;
  fakeUsers: Array<any> = new Array(1);
  different_location: any;
  yesorno: any;
  NewLocation: any;
  SpecialRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: FoodCartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.user_details = this.navParams.get("user_details")

    this.order_id = this.navParams.get("order_id")
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    this.mobile_number = this.jsonBody[0].mobile_number
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)
    console.log("mobile_number " + this.mobile_number)

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.cartList = cartServ.getAllCartfoodItems();

    this.params = {
      "user_id": this.user_id
    }


    this.apis.retrieve_address_details(this.params).then((result) => {
      this.body2 = result;
      this.address_details = JSON.stringify(this.body2)
      console.log("Lets see all the Adresss details as body " + this.body2)
      console.log("Lets see all the Adresss details " + this.address_details)
    });

    loader.dismiss();
  }

  getTotal(): number {
    this.check = this.cartServ.getGrandTotal()
    return this.cartServ.getGrandTotal();
  }


  updateCredit() {
    console.log('Cucumbers new state:' + this.card);
  }

  checkout() {

  

    let prod_details = this.cartList
    let orders = {};
    let new_list = [];

    for (let x in prod_details) {
      new_list.push({ 'food_id': prod_details[x]['food_id'], 'quantity': prod_details[x]['quantity'] })
    }

    orders = new_list

    console.log(new_list);
    console.log(JSON.stringify(orders));


    this.params = {
      "user_id": this.user_id,
      "orders": orders
    }

   

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log("PARAMS + ");
    console.log(this.params);

    this.apis.process_food_order(this.params).then((result) => {

      console.log('LETS RESULTS ' + result);
      console.log(result);
      var body1 = result;

      this.orderJson = JSON.stringify(body1)
      this.order_id = body1['order_id']

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      console.log('LETS SEE THE ORDER ID IN PROCESS ORDER ' + this.order_id);

      loader.dismiss();
      //this.navCtrl.push("FoodReceiptPage", { order_id: this.order_id, user_details: this.user_details })
      this.navCtrl.push("FoodPaymentPage", { order_id: this.order_id, user_details: this.user_details, requests: this.SpecialRequest,new_location: this.NewLocation })

    });

     //params for special requests
     console.log('SpecialRequest IS' + this.SpecialRequest);
     console.log('NewLocation IS' + this.NewLocation); 
     console.log('order_id IS' + this.order_id); 
     this.params2 = {
      "order_id": this.order_id,
      "requests": this.SpecialRequest,
      "new_location": this.NewLocation
    }


  }

  edit(item) {

    this.navCtrl.push("AddressPage", { addressDetails: this.body2, user_details: this.user_details, from_checkout: "1" });

  }


  not() {

    let alert = this.alertCtrl.create({
      title: "Oopps!",
      subTitle: "Feature not available",
      buttons: ['OK']
    });
    alert.present();

  }
}

