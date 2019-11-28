import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-food-order-details',
  templateUrl: 'food-order-details.html',
})
export class FoodOrderDetailsPage {

  check: any;
  params: any;
  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  order_id: any;
  list: any;
  user_details;

  constructor(public navCtrl: NavController, public navParams: NavParams,public apis: ApisProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.orderJson = this.navParams.get('value')
    this.user_details = this.navParams.get("customer_details")
    console.log("ORDER ID IN MODAL " +  this.orderJson )

     this.params = {
      
      "order_id": this.orderJson
    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.food_order_details(this.params).then((result) => {

       this.list = Array.of(result)

      this.orderJson = JSON.stringify(result)
      this.order_id = result['order_id']
      

      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      console.log('LETS SEE THE ORDER ID IN PROCESS ORDER ' + this.order_id);

      loader.dismiss();
       
           

    

    });

  }

  home(){ 
    this.navCtrl.setRoot("HomePage", {customer_details:this.user_details})

  }

 

}