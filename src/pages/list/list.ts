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
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  user_details;
  jsonBody: any;
  jsonBody1: any;
  list;

  body1: any;
  params: any;
  body: any;
  user_id: any;
  body2;
  list_details;
  food_list: string = "Weekly";
  

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user_details = this.navParams.get("customer_details")

    
      //Checking if user data is shown / logged in
      if ( this.user_details == undefined){
        console.log("No Login - NO User Data");
    
  
      }

      else{

    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS From LOGIN" + this.user_details)
    console.log("USer ID " + this.user_id)

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();



    this.params = {
      "user_id": this.user_id
    }


    this.apis.retrieve_list_details(this.params).then((result) => {
      this.body2 = result;
      this.list_details = JSON.stringify(this.body2)
      console.log("Lets see all the restaurant_details as body " + this.body2)
      console.log("Lets see all the restaurant_details " + this.list_details)
      console.log("Lets see all the restaurant_details " + this.list_details[0].resp_code)
      console.log("Lets see all the restaurant_details " + this.list_details.resp_code)
      console.log("Lets see all the restaurant_details " + this.list_details['resp_code'])

      // ":"101"
    });

    loader.dismiss();
  }
  }

  createList(){
    this.navCtrl.push("CreatelistPage",{customer_details: this.user_details})
  }

  placeOrder(item){


    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();



    this.params = {
      "user_id": this.user_id
    }


    this.apis.place_weekly_order(this.params).then((result) => {
      this.body2 = result;
      this.list_details = JSON.stringify(this.body2)
      console.log("Lets see all the restaurant_details as body " + this.body2)
      console.log("Lets see all the restaurant_details " + this.list_details)
    });

    loader.dismiss();
    let alert = this.alertCtrl.create({
      title: "",
      subTitle: "Your Weekly Order has been successfully placed. You will be contacted shortly by the M&F team.",
      buttons: ['OK']
    });
    alert.present();
  }


  edit(item) {

   



    this.params = {
      "id": item.id
    }

    console.log("Lets ITEM " + item)
    console.log("Lets ITEM ID " + item.id)


    this.apis.delete_schedule(this.params).then((result) => {
     
    });


    let alert = this.alertCtrl.create({
      title: "",
      subTitle: "Item has been successfully removed.",
      buttons: ['OK']
    });
    alert.present();

    this.navCtrl.setRoot("ListPage",{customer_details: this.user_details})

    //this.navCtrl.push("CreatelistPage", { listDetails: this.list_details, customer_details: this.user_details });

  }


}
