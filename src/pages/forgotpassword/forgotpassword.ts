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
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  public forgetForm: any;
  submitAttempt: boolean = false;
  loginVal: any;
  jsonBody: any;
  jsonBody1: any;

  resetPasswordForm: any;
  params: any;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.forgetForm = this._form.group({

      
      "mobile_number": ["", Validators.compose([Validators.required])]
    })
  
  }

  reset() {
    //send phone number to api in order to recieve sms code and proceed to the next page.
    // 

    this.params = {
      "mobile_number": this.forgetForm.value.mobile_number
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();

    this.apis.reset_password_get_phonenumber(this.params).then((result) => {



      if (result) {

        console.log("THIS IS THE RESULT" + result);
        console.log("THIS IS THE RESULT" + JSON.stringify(result));
        
        var jsonBody = result;
        console.log(jsonBody);

        // jsonBody = JSON.parse(jsonBody);
        // console.log(jsonBody)


        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];

        // this.storage.set("reset_phone_number",JSON.stringify(jsonBody["returned_phonenumber"]));

        console.log(desc);
        console.log(code);

        loader.dismiss();

        if (code == "000") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: desc,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  // jsonBody["returned_phonenumber"]
                  this.navCtrl.push('ResetcodePage', { mobile_number: this.forgetForm.value.mobile_number});
                }
              }
            ]
          });
          alert.present();
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
