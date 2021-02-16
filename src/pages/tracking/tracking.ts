import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';



@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  kofi: any;
  order_id: any;
  user_details: any;
  params;
  order_items;
  list;
  is_preparing: any;
  status;
  on_way;
  delivered;

  constructor(public apis: ApisProvider,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.order_id = this.navParams.get('value')
    this.user_details = this.navParams.get("customer_details")

    console.log("ORDER ID" + this.order_id)
   
    this.kofi ="2"


    this.params = {
      "order_id": this.order_id

    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.track_order(this.params).then((result) => {

      console.log (result)
    
      this.order_items = JSON.stringify(result)
      this.status = result[0].status
      this.is_preparing = result[0].is_preparing
      this.on_way = result[0].on_way
      this.delivered = result[0].delivered
       
     

      loader.dismiss();

    });
  }

  refresh(){
    this.order_id = this.navParams.get('value')
    this.user_details = this.navParams.get("customer_details")

    console.log("ORDER ID" + this.order_id)
   
    this.kofi ="2"


    this.params = {
      "order_id": this.order_id

    }

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.track_order(this.params).then((result) => {

      console.log (result)
    
      this.order_items = JSON.stringify(result)
      this.status = result[0].status
      this.is_preparing = result[0].is_preparing
      this.on_way = result[0].on_way
      this.delivered = result[0].delivered
       
     

      loader.dismiss();

    });

  }


  home(){ 
    this.navCtrl.setRoot("HomePage", {customer_details:this.user_details})

  }


  // rate() {
    
  //   const modal = this.modalCtrl.create("RatePage", {}, {cssClass:"mymodal"});
  //   modal.present();
  // }

}

