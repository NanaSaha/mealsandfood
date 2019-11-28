import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApisProvider, FoodCartService } from '../../providers/apis/apis';
import 'rxjs/add/operator/map'


@IonicPage()
@Component({
  selector: 'page-food-menu',
  templateUrl: 'food-menu.html',
})
export class FoodMenuPage {
  information: any[];
  body;
  count: any;
  user_details;
  fakeUsers: Array<any> = new Array(5);

  constructor(public apis: ApisProvider, public foodcartServ: FoodCartService, public loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.user_details = this.navParams.get("user_details")
    // let localData = http.get('assets/foods.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    //   console.log("Information", this.information )
    // })  

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();


    this.apis.fetch_foodstuff_menus().then((result) => {
      this.body = result;

      console.log(this.body)
      console.log(JSON.stringify(this.body))
      console.log("Information", this.body)
      console.log("-------------------------------------------------------")
    });

    console.log("-----------------------------------")
    this.count = this.foodcartServ.getAllCartfoodItems().length
    console.log("FIRST COUNT " + this.count)

    loader.dismiss();

  }

  details(food_item) {
    console.log("Lets see the foods id " + food_item.food_id)
    this.navCtrl.push("FoodDetailsPage", { food_id: food_item.food_id, user_details: this.user_details })
  }

  toggleSection(i) {
    console.log("Lets see I", i)
    this.body[i].open = !this.body[i].open;
  }

  toggleItem(i, j) {
    console.log("Lets see I J", i, j)
    this.body[i].children[j].open = !this.body[i].children[j].open;
  }


  cart() {

    this.navCtrl.push("FoodCartPage", { user_details: this.user_details })
  }

  addTocart(food_item) {

    console.log("These are the items " + food_item);
    let pro = JSON.stringify(food_item);
    console.log("NOw strign " + pro);
    this.foodcartServ.addItem(food_item, 0);

    console.log("LETS SEE ADD ITEM" + this.foodcartServ.addItem(food_item, 1));
    console.log("LETS SEE ALL CART ITEM" + this.foodcartServ.getAllCartfoodItems());
    console.log(this.foodcartServ.getAllCartfoodItems());

    this.count = this.foodcartServ.getAllCartfoodItems().length

    console.log("WHAT IS COUNT " + this.count)

    let string = JSON.stringify(this.count);

    console.log("STRINGFIY " + string)



  }

  lists(){
    
    this.navCtrl.push("ListPage",{customer_details: this.user_details})
  }


}
