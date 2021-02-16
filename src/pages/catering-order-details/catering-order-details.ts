import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-catering-order-details',
  templateUrl: 'catering-order-details.html',
})
export class CateringOrderDetailsPage {

  check: any;
  params: any;
  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  order_id: any;
  list: any;
  user_details;
  total_price;
  orderlist;

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


    this.apis.catering_order_details(this.params).then((result) => {

       this.list = Array.of(result)

      this.orderJson = JSON.stringify(result)
      this.order_id = result['order_id']
      this.orderlist = result['order_details']
      this.total_price = this.orderlist[0].total_price
      

      console.log('LIST ' + this.list);
      console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
      console.log('LETS SEE THE ORDER ID IN PROCESS ORDER ' + this.order_id);
      console.log('TOTAL PRICE'  + this.total_price);

      loader.dismiss();
       
           

    

    });

  }

  home(){ 
    this.navCtrl.setRoot("HomePage", {customer_details:this.user_details})

  }

 

}