
import { Component } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user_details;
  jsonBody: any;
  body: any;
  username: any;
  params: any;
  reg_id: any;
  user_type: any;
  from_login: any = [];

  constructor(public apis: ApisProvider,public loadingCtrl: LoadingController,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {

    // this.storage.get('value').then((value) => {
    //   this.user_details = value
    //   console.log("this.user_details " +  JSON.stringify(this.user_details))
    //   this.user_type = this.user_details[0].user_type
    // });

    

    this.from_login = this.navParams.get("customer_details")
    console.log("from_login " +  JSON.stringify(this.from_login))
    this.user_details = JSON.parse(this.from_login )
    // console.log("this.user_details " +  JSON.stringify(this.user_details))
    // console.log("from_login " +  this.from_login)
    // console.log("user_details " +  this.user_details)
    //this.username = this.user_details[0].username
    // this.reg_id = this.user_details[0].reg_id
    // this.user_type = this.user_details[0].user_type
    // console.log("USer DETAILS " + JSON.stringify(this.user_details))
    // console.log("Username " + JSON.stringify(this.username))
    // console.log("ID " + JSON.stringify(this.reg_id))
  

  }




  edit(item) {

    this.navCtrl.push("ProfileEditPage", { user_details: this.from_login });

  }
}
