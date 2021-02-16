import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ApisProvider,CateringCartService } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-catering-item-details',
  templateUrl: 'catering-item-details.html',
})
export class CateringItemDetailsPage {

 ports: any[];
  port: any;
  selectedPorts: any[];
  meals_id: any;
  body: any;
  body2: any;
  meals_details: any;
  meals_id_jsonBody: any;
  count: any;
  restaurant_id: any;
  user_details: any;
  fakeUsers: Array<any> = new Array(5);

  constructor(public apis: ApisProvider,public cartServ: CateringCartService,public loadingCtrl: LoadingController,public alertCtrl: AlertController,private http: Http,public navCtrl: NavController, public navParams: NavParams) {
    this.user_details = this.navParams.get("user_details")
    this.restaurant_id = this.navParams.get("restaurant_id")
    this.meals_id = this.navParams.get("meals_id")
    this.meals_id_jsonBody ={
      "meals_id":  this.meals_id
    }
    console.log('meals_id ID retrieved:',this.meals_id);

    this.apis.meal_details(this.meals_id_jsonBody).then((result) => {
      this.body = result;     
      this.meals_details = JSON.stringify(this.body)
      console.log("Lets see all the meals_details " +this.meals_details)
    });

    console.log("-----------------------------------")
    this.count = this.cartServ.getAllCateringCartItems().length
    console.log("FIRST COUNT " + this.count)
   
  }



  cart() {

    this.navCtrl.push("CartsPage",{user_details: this.user_details})
  }

  addTocart(item) {

    console.log("These are the items " + item);
    console.log("MEAL QUANTITYY " + item.quantity);
    let pro = JSON.stringify(item);
    console.log("NOw strign " + pro);
    this.cartServ.addItem(item, item.quantity);

    console.log(this.cartServ.getAllCateringCartItems());

    this.count = this.cartServ.getAllCateringCartItems().length
    console.log("WHAT IS COUNT " + this.count)
  

    this.navCtrl.push("CateringMenuPage",{ restaurant_id: this.restaurant_id,user_details: this.user_details})



  }





  quantityAdd(item) {
    this.cartServ.quantityPlus(item);
  }

  quantityMinus(item) {
    if (item.quantity > 1) {
      this.cartServ.quantityMinus(item);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Quantity is 1, you cant reduce it.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }


  removeItemFromCart(item) {
    //this.cartService.removeItemById(item.id);

    let self = this;

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to remove food item from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Buy clicked');
            self.cartServ.removeItemById(item.id);
          }
        }
      ]
    });
    alert.present();

  }




  

}
