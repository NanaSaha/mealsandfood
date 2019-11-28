

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ApisProvider,FoodCartService } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-food-details',
  templateUrl: 'food-details.html',
})
export class FoodDetailsPage {
  // cartList: Array<FoodCartItem>;
  food_id: any;
  body: any;
  body2: any;
  foods_details: any;
  food_id_jsonBody: any;
  count: any;
  user_details: any;
  price: any;
  fakeUsers: Array<any> = new Array(5);
  old_price: any;

  constructor(public apis: ApisProvider,public cartServ: FoodCartService,public loadingCtrl: LoadingController,public alertCtrl: AlertController,private http: Http,public navCtrl: NavController, public navParams: NavParams) {
    console.log("--------------CONSTRUCTOR START---------------------")
    this.user_details = this.navParams.get("user_details")
    this.food_id = this.navParams.get("food_id")
    this.food_id_jsonBody ={
      "food_id":  this.food_id
    }
    console.log('food_id ID retrieved:',this.food_id);

    this.apis.food_details(this.food_id_jsonBody).then((result) => {
      this.body = result;     
      this.foods_details = JSON.stringify(this.body)
      console.log("Lets see all the foods_details " +this.foods_details)
      
      this.old_price = this.body[0].price
      console.log(this.old_price)
     
    });

    console.log("-----------------------------------")
    this.count = this.cartServ.getAllCartfoodItems().length
    console.log("FIRST COUNT " + this.count)
    console.log("--------------CONSTRUCTOR END---------------------")
   
  }


  quantityAdd(item) {
    console.log("--------------ITEM PRICE---------------------")
   
    this.cartServ.quantityPlus(item);
    console.log(item)
   
  }

  quantityMinus(item) {
    console.log("--------------MINUM PRICE: " + this.old_price )
    console.log("--------------ITEM PRICE: " + item.price)
  
    if (item.price > this.old_price) {
      console.log("--------------MINUM PRICE: " + this.old_price )
    console.log("--------------ITEM PRICE GREATER: " + item.price)
      this.cartServ.quantityMinus(item);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Amount cannot be less than the minimum price.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }


  addTocart(item) {

    console.log("These are the items " + item);
    let pro = JSON.stringify(item);
    console.log("NOw strign " + pro);
    console.log("QUantity " + item.quantity);
    console.log("ITEM PRICE " + item.price);
    console.log("TYPED IN PRICE" + this.price);

    //ADDING NEW PRICE TO THE ITEM
    let food_details = item
    food_details.new_food_price =  this.price;
    console.log("NEW PRICE array " + food_details.new_food_price);
    console.log("NEW PRICE array " + food_details);
   console.log("NEW PRICE stringify " + JSON.stringify(food_details));

    this.cartServ.addItem(food_details, item.quantity);

    console.log(this.cartServ.getAllCartfoodItems());

    this.count = this.cartServ.getAllCartfoodItems().length
    console.log("WHAT IS COUNT " + this.count)
  

    this.navCtrl.push("FoodMenuPage",{ user_details: this.user_details})



  }




}
