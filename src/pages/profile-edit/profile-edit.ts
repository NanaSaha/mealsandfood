
import { Component } from '@angular/core';
import {IonicPage,NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApisProvider } from '../../providers/apis/apis';


@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  user_details: any;
  public updateProfile: any;
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
  person_id: any;
  from_login;

  
  profile = { first_name: '', last_name: '',mobile_number: '',email: '' }
  
  from_checkout: any;

  constructor(public alertCtrl: AlertController,public apis: ApisProvider,public loadingCtrl: LoadingController,public _form: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

    // this.user_details = this.navParams.get("user_details")
    

    this.from_login = this.navParams.get("user_details")
    console.log("from_login " +  JSON.stringify(this.from_login))
    this.user_details = JSON.parse(this.from_login )
    this.user_id = this.user_details[0].id
    // this.person_id = this.user_details[0].id
     console.log("USER ID 1 " + this.user_id )
     console.log("user_details" + this.user_details )
    // console.log("PERSON ID 1 " + this.person_id )

    this.updateProfile = this._form.group({
      "first_name": ["", Validators.compose([Validators.required])],

      "last_name": ["", Validators.compose([Validators.required])],
      "mobile_number": ["", Validators.compose([Validators.required])],
      "email": ["", Validators.compose([Validators.required])],
     
      
    })

    if (this.navParams.get('user_details')) {
      
      this.profile.first_name = this.user_details[0].first_name
      this.profile.last_name = this.user_details[0].last_name
      this.profile.mobile_number = this.user_details[0].mobile_number
      this.profile.email = this.user_details[0].email
    }
  }


  editProfile(){

    this.loginVal = JSON.stringify(this.updateProfile.value);
    this.jsonBody = JSON.parse(this.loginVal);

    this.user_id = JSON.parse(this.user_details[0].id)
    
    console.log("loginVal " + this.loginVal )
    console.log("jsonBody " + this.jsonBody )
    console.log("USER ID 2 " + this.user_id )
    

    this.params = {

      "id": this.user_id,
      "first_name": this.jsonBody.first_name,
      "last_name": this.jsonBody.last_name,
      "mobile_number": this.jsonBody.mobile_number,
      "email": this.jsonBody.email

    }

  
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


      this.apis.update_profile(this.params).then((result) => {
        // this.body1 = result;
        // this.retrieved = this.body1
        // this.retrieved = JSON.stringify(this.body1)

        console.log("THIS IS THE RESULT" + result);
        console.log("result" + JSON.stringify(result));
  
        var resp_code = result["resp_code"];
        var resp_desc = result["resp_desc"];
        console.log(resp_code);
        console.log(resp_desc);
  
  
        this.messageList = resp_desc;
        this.api_code = resp_code;

        console.log("retrieved" + this.retrieved )

        let alert = this.alertCtrl.create({
          title: "Profile Updated",
          subTitle:  this.messageList,
          buttons: [
            {
              text: 'OK', handler: () => {
                // this.navCtrl.setRoot("HomePage", { "customer_details": this.from_login });
                this.navCtrl.setRoot("ProfilePage", { "customer_details": this.from_login })
              }
            }

          ]
        });
        alert.present();
        
      });
 

    loader.dismiss();
    
  
     
    
    
  }

}
