import { Component } from '@angular/core';
import {IonicPage, NavController,AlertController,NavParams,Events } from 'ionic-angular';
import { ApisProvider,CartService, CartItem,FoodCartService, FoodCartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, ModalController } from 'ionic-angular';
import { removeSummaryDuplicates } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  cartList: Array<CartItem>;
  cartList2: Array<FoodCartItem>;
  user_details: any;
  jsonBody: any;
  body: any;
  user_id: any;
  params;
  order_date: any;
  count;
  constructor(public cartServ2: FoodCartService,public cartServ: CartService,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public apis: ApisProvider,public event: Events,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    
    this.user_details = this.navParams.get("customer_details")
    this.event.publish('customer_details',this.user_details);
    this.body = this.user_details
     this.jsonBody = JSON.parse(this.body);
     this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)


   
      console.log("REMOVE CART")
      this.cartServ.removeallcart();
      this.cartServ2.removeallfoodcart();
      this.count = this.cartServ.getAllCartItems().length



    this.params = {
      "user_id": this.user_id

    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.order_history(this.params).then((result) => {

      console.log (result)

      if (result["resp_code"] == "112" ){

        this.toastCtrl.create({
          message: "No Orders Available yet",
          duration: 3000
        }).present();


      }
      else{
        this.order_date = result[0].order_date
        console.log('LETS SEE LIST order_date ' + this.order_date); 
      }
 
     

      loader.dismiss();

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

 


  meals(){
    // this.navCtrl.push("SearchMealsPage", { user_details: this.user_details})

    let alert = this.alertCtrl.create({
      title: "",
      subTitle: "Coming Soon..",
      buttons: ['OK']
    });
    alert.present();
  }

  food(){

    this.navCtrl.push("FoodMenuPage",{ user_details: this.user_details})

  }

  check_orders(){
    this.navCtrl.push("OrderHistoryPage",{ customer_details: this.user_details})
  }

}
