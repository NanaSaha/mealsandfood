import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ApisProvider, CartService } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'



@IonicPage()
@Component({
  selector: 'page-meal-menu',
  templateUrl: 'meal-menu.html',
})
export class MealMenuPage {
  food_cat: string = "breakfast";
  information: any[];
  restaurant_id: any;
  body: any;
  body2: any;
  menu_details: any;
  restaurant_details: any;
  restaurant_name: any;
  restaurant_logo: any;
  restaurant_description: any;
  count: any;
  user_details: any;
  params: any;
  menus: any;
  fakeUsers: Array<any> = new Array(5);

  constructor(public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.user_details = this.navParams.get("user_details")
    this.restaurant_id = this.navParams.get("restaurant_id")
    console.log('restaurant_id ID retrieved:', this.restaurant_id);

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    // this.params ={
    //   "restaurant_id": this.restaurant_id
    // }
    // this.apis.retrieve_restaurant_menu(this.params).then((result) => {
    //   this.menus = result;
    //   console.log(this.menus)

    // });

    this.apis.fetch_restaurant_menus(this.restaurant_id).then((result) => {
      this.body = result;
      if (this.body != null){
      this.body2 = result[0];
      this.menu_details = JSON.stringify(this.body)
      this.restaurant_details = JSON.stringify(this.body2)
      this.restaurant_name = this.body2.restaurant_name
      this.restaurant_logo = this.body2.restaurant_logo
      this.restaurant_description = this.body2.restaurant_description
      console.log("-------------------------------------------------------")
      console.log(this.body)
      console.log(JSON.stringify(this.body))
      console.log("Information", this.body )
      console.log("-------------------------------------------------------")
      }
      else {
        this.body == 0
        console.log("bodty is 0000" )
      }
    });


    console.log("-----------------------------------")
    this.count = this.cartServ.getAllCartItems().length
    console.log("FIRST COUNT " + this.count)

    loader.dismiss();

    // let localData = http.get('assets/information.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    //   console.log("Information", this.information )

    // })  
  }


  details(item) {
    console.log("Lets see the meals id " + item.meals_id)
    this.navCtrl.push("ItemDetailsPage", { meals_id: item.meals_id, restaurant_id: this.restaurant_id, user_details: this.user_details })
  }

  toggleSection(i) {
    console.log("Lets see Index", i)
    
    this.body[i].open = !this.body[i].open;
  }

  toggleItem(i,j) {
    console.log("Lets see I J", j)
    // this.information[i].children[j].open = !this.information[i].children[j].open;
    this.body[i].meals[j].open = !this.body[i].meals[j].open;
  }


  cart() {

    this.navCtrl.push("CartsPage", { user_details: this.user_details })
  }

  addTocart(meal_item) {

    console.log("These are the items " + meal_item);
    console.log("MEAL QUANTITYY " + meal_item.quantity);
    let pro = JSON.stringify(meal_item);
    console.log("NOw strign " + pro);
    this.cartServ.addItem(meal_item, meal_item.quantity);

    console.log("LETS SEE ALL CART ITEM" + this.cartServ.getAllCartItems());
    console.log(this.cartServ.getAllCartItems());

    this.count = this.cartServ.getAllCartItems().length

    console.log("WHAT IS COUNT " + this.count)

    let string = JSON.stringify(this.count);

    console.log("STRINGFIY " + string)



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


}
