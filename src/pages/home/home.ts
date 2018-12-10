import { Component } from '@angular/core';
import {IonicPage, NavController,AlertController,NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 
  user_details: any;
  jsonBody: any;
  body: any;
  user_id: any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {

    this.user_details = this.navParams.get("customer_details")
    this.body = this.user_details
     this.jsonBody = JSON.parse(this.body);
     this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)
    
  }

 


  meals(){
    this.navCtrl.push("SearchMealsPage", { user_details: this.user_details})
  }

  food(){

    this.navCtrl.push("FoodMenuPage",{ user_details: this.user_details})

  }

}
