import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ApisProvider, CartService, CartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';




@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {
  cartList: Array<CartItem>;
  user_details;
  jsonBody: any;
  body: any;
  user_id: any;
  params;
  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  order_id: any;
  list: any;
  list2: any;
   list3: any;
  q: any;
  delivered;
  order_history: string = "Foodstuffs";

  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.user_details = this.navParams.get("customer_details")

     //Checking if user data is shown / logged in
    if ( this.user_details == undefined){
      console.log("No Login - NO User Data");
  

    }

    else {
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)



    this.params = {
      "user_id": this.user_id

    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.order_history(this.params).then((result) => {

      console.log(result)

      if (result["resp_code"] == "112") {
        
      
        this.toastCtrl.create({
          message: "No Orders Available yet",
          duration: 3000
        }).present();
        loader.dismiss();

      }

      else{

      this.orderJson = JSON.stringify(result)
      this.order_id = result['order_id']

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      this.list = JSON.parse(this.orderJson)
      this.delivered = result[0].delivered
      console.log('LETS SEE LIST delivered ' + this.delivered);

      loader.dismiss();

    }

    }, (err) => {

      let alert = this.alertCtrl.create({
        title: "",
        subTitle: "Sorry, cant connect right now. Please try again!",
        buttons: ['OK']
      });
      alert.present();
      
    });
      

    this.apis.food_order_history(this.params).then((result) => {

      console.log(result)
      if (result["resp_code"] == "112") {
  
        this.toastCtrl.create({
          message: "No Orders Available yet",
          duration: 3000
        }).present();

        loader.dismiss();
      }

      else{

      this.orderJson = JSON.stringify(result)
      this.order_id = result['order_id']

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      this.list2 = JSON.parse(this.orderJson)
      this.delivered = result[0].delivered
      console.log('LETS SEE LIST delivered ' + this.delivered);

      loader.dismiss();

      }

    }, (err) => {

      let alert = this.alertCtrl.create({
        title: "",
        subTitle: "Sorry, cant connect right now. Please try again!",
        buttons: ['OK']
      });
      alert.present();
   
    }
    );
      
      
      
      //CATRERIN HISTORY
        this.apis.catering_order_history(this.params).then((result) => {

      console.log(result)
      if (result["resp_code"] == "112") {
  
        this.toastCtrl.create({
          message: "No Orders Available yet",
          duration: 3000
        }).present();

        loader.dismiss();
      }

      else{

      this.orderJson = JSON.stringify(result)
      this.order_id = result['order_id']

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      this.list3 = JSON.parse(this.orderJson)
      this.delivered = result[0].delivered
      console.log('LETS SEE LIST delivered ' + this.delivered);

      loader.dismiss();

      }

    }, (err) => {

      let alert = this.alertCtrl.create({
        title: "",
        subTitle: "Sorry, cant connect right now. Please try again!",
        buttons: ['OK']
      });
      alert.present();
   
    }
        );
      
      //CATRERIN HISTORY END

  }
  }



  details(q) {


    let select = q.order_id
    console.log("LETS SEE ID SELECTED " + select)

    this.navCtrl.push("OrderDetailsPage", { value: select, customer_details: this.user_details })
  }

  details2(q)  //for foodstuffs hitsory
  {


    let select = q.order_id
    console.log("LETS SEE ID SELECTED " + select)

    this.navCtrl.push("FoodOrderDetailsPage", { value: select, customer_details: this.user_details })
  }


  details3(q)  //for catering hitsory
  {


    let select = q.order_id
    console.log("LETS SEE ID SELECTED " + select)

    this.navCtrl.push("CateringOrderDetailsPage", { value: select, customer_details: this.user_details })
  }

  track(q) {


    let select = q.order_id
    console.log("LETS SEE ID SELECTED " + select)

    this.navCtrl.push("TrackingPage", { value: select, customer_details: this.user_details })
  }


  home() {
    this.navCtrl.setRoot("HomePage", { customer_details: this.user_details })

  }



}
