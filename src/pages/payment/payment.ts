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




  constructor(public toastCtrl: ToastController, public _form: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.user_details = this.navParams.get("user_details")
    this.order_id = this.navParams.get("order_id")
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    this.customer_name = this.jsonBody[0].first_name + " " + this.jsonBody[0].last_name
    this.customer_email = this.jsonBody[0].email
    this.mobile_number = this.jsonBody[0].mobile_number
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)
    console.log("mobile_number " + this.mobile_number)
    this.cartList = cartServ.getAllCartItems();



    this.paymentForm = this._form.group({

      "momo_number": ["", Validators.compose([Validators.required])],
      "network": ["", Validators.compose([Validators.required])],
      "voucher": [""],

    })


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




}
