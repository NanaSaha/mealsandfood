import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public addForm: any;
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
  params: any;
  body: any;
  user_id: any;
  user_details: any;
  

  address = { address_name: '', landmark: '', directions: '', additional_instructions: '' }
  addressdata;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user_details = this.navParams.get("user_details")
    

    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)

    this.addForm = this._form.group({

      "address_name": ["", Validators.compose([Validators.required])],
      "landmark": ["", Validators.compose([Validators.required])],
      "directions": [""],
      "additional_instructions": [""]
    })


    this.addressdata = this.navParams.get('addressDetails');
    console.log (this.addressdata)
    if (this.navParams.get('addressDetails')) {
      this.address.address_name = this.addressdata[0].address_name
      this.address.landmark = this.addressdata[0].landmark
      this.address.directions = this.addressdata[0].directions
      this.address.additional_instructions = this.addressdata[0].additional_instructions
    }
  }





  save_address() {

    this.loginVal = JSON.stringify(this.addForm.value);
    this.jsonBody = JSON.parse(this.loginVal);

    this.params = {

      "user_id": this.user_id,
      "address_name": this.jsonBody.address_name,
      "landmark": this.jsonBody.landmark,
      "directions": this.jsonBody.directions,
      "additional_instructions": this.jsonBody.additional_instructions

    }

  
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    if (this.navParams.get('addressDetails')) {

      this.apis.update_address(this.params).then((result) => {
        this.body1 = result;
        this.retrieved = this.body1
        this.retrieved = JSON.stringify(this.body1)
      });

    //   let alert = this.alertCtrl.create({
    //     title: "Oopps!",
    //     subTitle: "UPDATE TABLE",
    //     buttons: ['OK']
    //   });
    //   alert.present();
      
     }

    else {

      // let alert = this.alertCtrl.create({
      //   title: "Oopps!",
      //   subTitle: "SAVE IN TABLE",
      //   buttons: ['OK']
      // });
      // alert.present();

    this.apis.save_address(this.params).then((result) => {
      this.body1 = result;
      this.retrieved = this.body1
      this.retrieved = JSON.stringify(this.body1)
    });
  }

    loader.dismiss();
    this.navCtrl.push("CheckoutPage", { user_details: this.user_details })
  }

}
