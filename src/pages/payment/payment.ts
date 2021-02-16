import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, CartService, CartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  cartList: Array<CartItem>;
  public paymentForm: any;
  momo: boolean;
  body: any;
  user_id: any;
  user_details: any;
  jsonBody: any;
  mobile_number: any;
  order_id: any;
  money: any;
  formValue: any;
  params: any;
  customer_name: any;
  customer_email: any;
  amount: any;

  NewLocation: any;
  SpecialRequest: any;
  total_amt;


    service_fee;
  delivery_fee;

  jsonCheck: any;
  jsonCheck2;
  params2: any;
  total_amount_plus_delivery;


   public public_key = 'pk_live_25b093361d8ff68330d94fda3baefea56b0db1c4'; //Put your paystack Test or Live Key here
  public channels = ['bank', 'card', 'ussd', 'qr','mobile_money']; //Paystack Payment Methods
  public random_id = Math.floor(Date.now() / 1000); //Line to generate reference number





  constructor(public toastCtrl: ToastController, public _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
       this.user_details = this.navParams.get("user_details")
    this.order_id = this.navParams.get("order_id")
    this.SpecialRequest = this.navParams.get("requests")
    this.NewLocation = this.navParams.get("new_location")
    this.total_amount_plus_delivery =  this.navParams.get("total_amount_plus_delivery") * 100
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    this.customer_name = this.jsonBody[0].first_name + " " + this.jsonBody[0].last_name
    this.customer_email = this.jsonBody[0].email
    this.mobile_number = this.jsonBody[0].mobile_number
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)
    console.log("mobile_number " + this.mobile_number)
    console.log("order_id " + this.order_id)
    console.log('SpecialRequest IS' + this.SpecialRequest);
    console.log('NewLocation IS' + this.NewLocation); 
      console.log('total_amount_plus_delivery IS' + this.total_amount_plus_delivery ); 

     this.amount = this.cartServ.getGrandTotal()

     console.log('AMOUNT IS' + this.amount);



    this.paymentForm = this._form.group({

      "momo_number": ["", Validators.compose([Validators.required])],
      "network": ["", Validators.compose([Validators.required])],
      "voucher": [""],

    })


      let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    //params for special requests
    this.params2 = {
      "order_id": this.order_id,
      "requests": this.SpecialRequest,
      "new_location": this.NewLocation
    }


    this.apis.save_special_request_food(this.params2).then((result) => {
     console.log(result)
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

      this.total_amt = this.getTotal() + (this.getTotal()* this.service_fee ) + this.delivery_fee
    
    
      console.log("TOTAL AMOUNT PLUS DELIVERY" + this.total_amt)
     
    });

    loader.dismiss();




  }

  getTotal(): number {
    this.amount = this.cartServ.getGrandTotal()
    return this.cartServ.getGrandTotal();
  }


  pay() {

    this.formValue = JSON.stringify(this.paymentForm.value);
    this.jsonBody = JSON.parse(this.formValue);

    console.log("FORM VALUE " + this.formValue)
    console.log("USer ID " + this.user_id)
    console.log("ORDER ID " + this.order_id)
    console.log("customer_name " + this.customer_name)
    console.log("customer_email " + this.customer_email)
    console.log("mobile_number " + this.mobile_number)
    console.log("MOMO number " + this.jsonBody.momo_number)
    console.log("MOMO network " + this.jsonBody.network)
    console.log("MOMO voucher " + this.jsonBody.voucher)
    console.log("Amount " + (this.amount + 10))

    this.params = {

      "customer_name": this.customer_name,
      "customer_email": this.customer_email,
      "customer_telephone": this.mobile_number,
      "mobile_wallet_number": this.jsonBody.momo_number,
      "mobile_wallet_network": this.jsonBody.network,
      "amount": this.amount + 10,
      "user_id": this.user_id,
      "order_id": this.order_id,
      "voucher": this.jsonBody.voucher

    }


    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.make_payment(this.params).then((result) => {
      console.log("------------RESULTS--------------")
      console.log(result)

      loader.dismiss();
      this.navCtrl.push("ReceiptPage", { momo_network: this.jsonBody.network, order_id: this.order_id, user_details: this.user_details })

    },

      (err) => {

        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Ooops! We encountered an issue trying to charge the mobile wallet. Please try again!",
          buttons: ['OK']
        });
        alert.present();

        this.toastCtrl.create({
          message: "Please check your internet connection",
          duration: 5000
        }).present();
        loader.dismiss();
        console.log(err);
      }

    );

  }







  cash_pay() {


    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();
    this.navCtrl.push("ReceiptPage", { momo_network: "", order_id: this.order_id, user_details: this.user_details })
    loader.dismiss();
  }




    //Callback function on successful payment 
  paymentDone(ref: any) {
    console.log(ref) //ref contains the response from paystack after successful payment

    this.navCtrl.push("ReceiptPage", { momo_network: "", order_id: this.order_id, user_details: this.user_details })
    
  }

  //Event triggered if User cancel the payment
  paymentCancel() {
    console.log('gateway closed')
    //  this.navCtrl.push("ReceiptPage", { momo_network: "", order_id: this.order_id, user_details: this.user_details })
  }




}
