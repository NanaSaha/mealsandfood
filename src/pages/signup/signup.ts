import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  signupVal: any;
  jsonBody: any;

  public itemList: Array<Object>;
  from_cart_or_sidemenu;

  constructor(public navCtrl: NavController, public apis: ApisProvider, public _form: FormBuilder, public toastCtrl: ToastController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  
    this.from_cart_or_sidemenu = this.navParams.get("cart_or_sidemenu")
    console.log ("From Sidemenu or cart " +  this.from_cart_or_sidemenu)

   this.signupForm = this._form.group({
      "first_name": ["", Validators.compose([Validators.required])],
      "last_name": ["", Validators.compose([Validators.required])],
      "mobile_number": ["", Validators.compose([Validators.required])],
      "email": ["",Validators.compose([Validators.required])],
      "password": ["",Validators.compose([Validators.required])],
      "confirm_password": ["",Validators.compose([Validators.required])],
    })

}


signup() {

  this.signupVal = JSON.stringify(this.signupForm.value);

  this.jsonBody = JSON.parse(this.signupVal);

  console.log("THIS IS THE SIGNUP raw values VALUES" + this.signupVal)
  console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody)



  let loader = this.loadingCtrl.create({
    content: "Please wait ..."
  });

  loader.present();

  this.apis.signup(this.jsonBody).then((result) => {

    console.log(result);
      var jsonBody = result;
      console.log(jsonBody);

      // jsonBody = JSON.parse(jsonBody);
      // console.log(jsonBody)

      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];


      console.log(desc);
      console.log(code);

      this.messageList = desc;
      this.api_code = code;

     loader.dismiss();

    if (this.api_code == "200") {
      let loader = this.loadingCtrl.create({
        content: "Verifying Account ..."
      });
      loader.present();

      setTimeout(() => {
        if (this.from_cart_or_sidemenu == "sidemenu"){
          this.navCtrl.setRoot("LoginPage", { cart_or_sidemenu: "sidemenu" });
       
        }
        else if (this.from_cart_or_sidemenu == "cart"){
          this.navCtrl.setRoot("LoginPage", { cart_or_sidemenu: "cart" });

        }
          
           else if (this.from_cart_or_sidemenu == "meals_cart"){
          this.navCtrl.setRoot("LoginPage", { cart_or_sidemenu: "meals_cart" });

        }
          
            else if (this.from_cart_or_sidemenu == "catering_cart"){
            this.navCtrl.push("LoginPage", { cart_or_sidemenu: "catering_cart" })

          }
        else {
          this.navCtrl.setRoot("LoginPage", { cart_or_sidemenu: "sidemenu" });
        }
       
        
      }, 3000);

      setTimeout(() => {
        loader.dismiss();
      }, 3000);

    }

    if (this.api_code != "200") {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: this.messageList,
        buttons: ['OK']
      });
      alert.present();
    }

  }, (err) => {

    let alert = this.alertCtrl.create({
      title: "",
      subTitle: "Sorry, something went wrong. Please try again!",
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



login(){



if (this.from_cart_or_sidemenu == "sidemenu"){
  this.navCtrl.push("LoginPage", { cart_or_sidemenu: "sidemenu" });

}
else if (this.from_cart_or_sidemenu == "cart"){
  this.navCtrl.push("LoginPage", { cart_or_sidemenu: "cart" });

}
else {
  this.navCtrl.push("LoginPage", { cart_or_sidemenu: "sidemenu" });
}
}

}
