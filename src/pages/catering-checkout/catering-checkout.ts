import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, CateringCartService, CateringCartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-catering-checkout',
  templateUrl: 'catering-checkout.html',
})
export class CateringCheckoutPage {

 cartList: Array<CateringCartItem>;
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
  total_amt;
  total_amount_plus_delivery;
  service_fee;
  delivery_fee;

  jsonCheck: any;
  jsonCheck2;

   points;
  redeemable_amount;
  time_slots;
  time;

  time_selected;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CateringCartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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

    this.cartList = cartServ.getAllCateringCartItems();


   
    
    console.log("CARTLIST ITEMS " + JSON.stringify(this.cartList) )
    
    
   

    this.params = {
      "user_id": this.user_id
    }

   

      //Retrieve Time SLOTS
      this.apis.retrieve_time_slot().then(
        (result) => {
          console.log(result);

          this.time = result
       
          console.log("time SLOTS" + this.time);
          console.log("time SLOTS STRING" + JSON.stringify(this.time ));
         
          }
      )


      //Retrieve Loyalty Points
      this.apis.retrieve_loyalty_points(this.params).then(
        (result) => {
          console.log(result);

          this.points = result[0].points;
         this.redeemable_amount = result[0].redeemable_amount;
            console.log("points,redeemable_amount " + this.points ,  this.redeemable_amount);
         
          }
      )
        //END Retrieve Loyalty Points


    this.apis.retrieve_address_details(this.params).then((result) => {
      this.body2 = result; 
      this.address_details = JSON.stringify(this.body2)
      console.log("Lets see all the Adresss details as body " + this.body2)
      console.log("Lets see all the Adresss details " + this.address_details)
    });

    this.apis.retrieve_delivery_charges().then((result) => {
      this.body = result;
  
      console.log(this.body)
      console.log(JSON.stringify(this.body))
      console.log("Information", this.body)

      this.service_fee = this.body[0].service_fee
      this.delivery_fee = this.body[0].delivery_fee
  
      console.log("------------SERV FEE _+ DELIVE-------------------------------------------")
      console.log("SERVICE FEE" + this.service_fee) 
      console.log("DEL FEE " + this.delivery_fee) 

      console.log("CARTLIST ITEMS " + JSON.stringify(this.cartList))
      
           if (this.points > 9999) {
            this.total_amount_plus_delivery = (this.getTotal() - this.redeemable_amount) + (this.getTotal() * this.service_fee) + this.delivery_fee
    
    
            console.log("TOTAL AMOUNT PLUS WITH REDEEMABLE DELIVERY" + this.total_amount_plus_delivery)
          }
          else {

             this.total_amount_plus_delivery = (this.getTotal()) + (this.getTotal() * this.service_fee) + this.delivery_fee
    
    
            console.log("TOTAL AMOUNT MINUS REDDEEMA PLUS DELIVERY" + this.total_amount_plus_delivery)
            
          }
      // this.total_amount_plus_delivery = (this.getTotal()- this.redeemable_amount) + (this.getTotal()* this.service_fee ) + this.delivery_fee
    
    
      // console.log("TOTAL AMOUNT PLUS DELIVERY" + this.total_amount_plus_delivery)
     
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
      new_list.push({ 'catering_meals_id': prod_details[x]['catering_meals_id'], 'quantity': prod_details[x]['quantity'], 'price': prod_details[x]['price'] })
    }

    orders = new_list

    console.log(new_list);
    console.log(JSON.stringify(orders));

    console.log("TOTAL AMOUNT PLUS DELIVERY" + this.total_amount_plus_delivery)


    this.params = {
      "user_id": this.user_id,
      "orders": orders,
      "total_price": this.total_amount_plus_delivery 
    }


    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    console.log("PARAMS + ");
    console.log(this.params);

    this.apis.process_catering_order(this.params).then((result) => {

      console.log('LETS RESULTS ' + result);
      console.log(result);
      var body1 = result;

      this.orderJson = JSON.stringify(body1)
      this.order_id = body1['order_id']

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      console.log('LETS SEE THE ORDER ID IN PROCESS ORDER ' + this.order_id);

      loader.dismiss();
      
      this.navCtrl.push("CateringPaymentPage", { order_id: this.order_id, user_details: this.user_details, requests: this.SpecialRequest,new_location: this.NewLocation , total_amount_plus_delivery: this.total_amount_plus_delivery})

    });   

     //params for special requests
     console.log('SpecialRequest IS' + this.SpecialRequest);
    console.log('NewLocation IS' + this.NewLocation); 
    console.log('TIME SLOT IS' + this.time_selected); 
     console.log('order_id IS' + this.order_id); 
     this.params2 = {
      "order_id": this.order_id,
      "requests": this.SpecialRequest,
      "new_location": this.NewLocation
    }


  }



  edit(item) {

    this.navCtrl.push("AddressPage", { addressDetails: this.body2, user_details: this.user_details });

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

