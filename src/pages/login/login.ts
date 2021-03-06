import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  submitAttempt: boolean = false;
  loginVal: any;
  jsonBody: any;
  jsonBody1: any;

  messageList: any;
  api_code: any;
  Phonenumber: string;
  PIN: string;
  retrieve: string;
  retrieved: string;
  retrieve_pers: string;
  retrieve_doc: string;
  retrieve_doc3: string;
  body1: any;
  from_cart_or_sidemenu;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.from_cart_or_sidemenu = this.navParams.get("cart_or_sidemenu")
    console.log ("From Sidemenu or cart " +  this.from_cart_or_sidemenu)
   
    this.loginForm = this._form.group({

      "password": ["", Validators.compose([Validators.required])],
      "mobile_number": ["", Validators.compose([Validators.required])]
    })

  }


  signup() {
    this.navCtrl.push("SignupPage")

  }

  reset() {
    this.navCtrl.push("ForgotpasswordPage")

  }


  login() {

    this.loginVal = JSON.stringify(this.loginForm.value);
    console.log("LETS SEE THE LOGIN VAL " + this.loginVal)

    this.jsonBody = JSON.parse(this.loginVal);
    console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody)
    console.log("THIS IS THE SIGNUP VALUES STRINGIFY" + JSON.stringify(this.jsonBody))


    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
      spinner: 'dots',
      // cssClass: 'transparent'
    });

    loader.present();

    // Retrieving customer details to pass in to the next page

    this.apis.retrieve_details(this.jsonBody).then((result) => {
      this.body1 = result;
      // body1 = JSON.parse(body1);

      this.retrieved = this.body1
      this.retrieved = JSON.stringify(this.body1)

      console.log('LETS SEE THE  BODY OF RETRIEVAL ' + this.body1);
      console.log('LETS SEE THE DATA RETRIEVED ' + this.retrieved);


    });

    this.apis.login(this.jsonBody).then((result) => {

      console.log(result);
      var jsonBody = result;
      console.log(jsonBody);

      // jsonBody = JSON.parse(jsonBody);
      // console.log(jsonBody)

      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];
      var message = jsonBody["message"];


      console.log(desc);
      console.log(code);

      this.messageList = message;
      this.api_code = code;


      loader.dismiss();
      if (this.api_code == "200") {
        let loader = this.loadingCtrl.create({
          content: "Login processing..."
        });

        loader.present();

        setTimeout(() => {

          if (this.from_cart_or_sidemenu == "sidemenu"){
            this.navCtrl.setRoot("HomePage", { customer_details: this.retrieved })
         
          }
          else if (this.from_cart_or_sidemenu == "cart"){
            this.navCtrl.push("FoodCartPage", { user_details: this.retrieved })

          }
            
         else if (this.from_cart_or_sidemenu == "meals_cart"){
            this.navCtrl.push("CartsPage", { user_details: this.retrieved })

          }

           else if (this.from_cart_or_sidemenu == "catering_cart"){
            this.navCtrl.push("CateringCartPage", { user_details: this.retrieved })

          }
            
            
          else {
            this.navCtrl.setRoot("HomePage", { customer_details: this.retrieved })
          }
         




        }, 1000);

        setTimeout(() => {
          loader.dismiss();
        }, 1000);

      }



      if (this.api_code != "200") {
        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Wrong mobile number or password.Kindly try again!",
          buttons: ['OK']
        });
        alert.present();

      }
    },

      (err) => {

        let alert = this.alertCtrl.create({
          title: "",
          subTitle: "Sorry, cant connect right now. Please try again!",
          buttons: ['OK']
        });
        alert.present();

        this.toastCtrl.create({
          message: "Please check your internet connection",
          duration: 5000
        }).present();
        loader.dismiss();
        console.log(err);
      });
  }

}
