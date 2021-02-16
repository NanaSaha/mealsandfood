import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';

import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';

import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-resetcode',
  templateUrl: 'resetcode.html',
})
export class ResetcodePage {
  mobile_number: any;

  resetPasswordForm : any;
  params : any;
  reset_phone_number : any;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.mobile_number = this.navParams.get('mobile_number')
    console.log("mobile_number is " + this.mobile_number);

    this.resetPasswordForm = this._form.group({

      "resetcode": ["", Validators.compose([Validators.required])],
    })


  }

  reset(){
    //send phone number to api in order to recieve sms code and proceed to the next page.

    this.params = {
      "mobile_number": this.mobile_number,
      "reset_token" : this.resetPasswordForm.value.resetcode
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();

    this.apis.reset_password_get_smscode(this.params).then((result) => {

      if (result) {

        console.log("THIS IS THE RESULT" + result);
        console.log("THIS IS THE RESULT" + JSON.stringify(result));
        var jsonBody = result;
        console.log(jsonBody);

        // jsonBody = JSON.parse(jsonBody);
        // console.log(jsonBody)


        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];
        var reset_sms_code = jsonBody["db_reset_token"];

       

        console.log(desc);
        console.log(code);
        console.log(reset_sms_code);


        loader.dismiss();

        if (code == "000") {
          this.navCtrl.push("ChangepasswordPage", { mobile_number: this.mobile_number,reset_sms_code: reset_sms_code});
        }else{
          this.showalertmessage("M&F",desc);
        }
      }



    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not complete this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });


  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ['OK']
    });
    alert.present();
  }

}
