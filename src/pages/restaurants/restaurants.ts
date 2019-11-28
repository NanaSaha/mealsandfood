import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';



@IonicPage()
@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {
  location_id: any;
  body: any;
  fakeUsers: Array<any> = new Array(5);
  restaurant_details:any;
  raw: any;
  raw1: any;
  location_name: any;
  user_details: any;

  constructor(public apis: ApisProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.location_id = this.navParams.get("location_id_value")
    this.location_name = this.navParams.get("location_name")
    this.user_details = this.navParams.get("user_details")
    console.log('Location ID retrieved:',this.location_id);  

    this.apis.fetch_restaurants(this.location_id).then((result) => {
      this.body = result;    
      this.restaurant_details = JSON.stringify(this.body)
      console.log("Lets see all the restaurant_details as body " + this.body)
      console.log("Lets see all the restaurant_details " +this.restaurant_details)
    });
  }




  openMenu(item){
    console.log("Lets restaurant id " + JSON.stringify(item.id))

    this.navCtrl.push("MealMenuPage", {restaurant_id: item.id, user_details: this.user_details });
  }




}
