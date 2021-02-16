import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';


import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';

import { FormBuilder, Validators,ValidatorFn,AbstractControl,FormControl, FormGroup,  } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  resetPasswordForm : any;
  params : any;
  mobile_number : any;
  reset_sms_code : any;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.mobile_number = this.navParams.get("mobile_number")
    this.reset_sms_code = this.navParams.get("reset_sms_code")

    // this.resetPasswordForm = new FormGroup({
    //   password: new FormControl('', [Validators.required]),
    //   confirmPassword: new FormControl('', [Validators.required,this.equalto('password')])
    // });


    this.resetPasswordForm = this._form.group({

      "password": ["", Validators.compose([Validators.required])],
      "confirmPassword": ["", Validators.compose([Validators.required,this.equalto('password')])],
    })

  }


  reset(){
    //send phone number to api in order to recieve sms code and proceed to the next page.

    this.params = {
      "mobile_number": this.mobile_number,
      "reset_token" : this.reset_sms_code,
      "confirmed_password": this.resetPasswordForm.value.confirmPassword
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."
    });
    loader.present();

    this.apis.reset_password_new_password(this.params).then((result) => {

      if (result) {

        console.log("THIS IS THE RESULT" + result);
        console.log("THIS IS THE RESULT" + JSON.stringify(result));
        var jsonBody = result;
        console.log(jsonBody);

        // jsonBody = JSON.parse(jsonBody);
        // console.log(jsonBody)


        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];
        


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
                  this.navCtrl.push("LoginPage");
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

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

    let input = control.value;

    let isValid=control.root.value[field_name]==input
    if(!isValid)
    return { 'equalTo': {isValid} }
    else
    return null;
    };
    }

    showalertmessage(titlemsg, mainmsg) {
      let alert = this.alertCtrl.create({
        title: titlemsg,
        subTitle: mainmsg,
        buttons: ['OK']
      });
      alert.present();
    }

    showmessage(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }


}
