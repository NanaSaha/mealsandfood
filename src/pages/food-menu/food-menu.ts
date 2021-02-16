import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApisProvider, FoodCartService } from '../../providers/apis/apis';
import 'rxjs/add/operator/map'
import { FormBuilder, Validators } from '@angular/forms';


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

  food_id: any;
  body2: any;
  foods_details: any;
  food_id_jsonBody: any;

  price: any;

  old_price: any;
  typed_price;

  catCode = [];
  childComment;
  priceVal;
  jsonBody;
  jsonData

  public amountForm: any;

  constructor( public alertCtrl: AlertController,public _form: FormBuilder,public apis: ApisProvider, public cartServ: FoodCartService, public loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.user_details = this.navParams.get("user_details")
    // let localData = http.get('assets/foods.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    //   console.log("Information", this.information )
    // })  
    this.amountForm = this._form.group({

      "price": [""],
      
    })
   

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
    this.count = this.cartServ.getAllCartfoodItems().length
    console.log("FIRST COUNT " + this.count)

    loader.dismiss();


    

  }

  loadBody() {
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
    this.count = this.cartServ.getAllCartfoodItems().length
    console.log("FIRST COUNT " + this.count)

    loader.dismiss();
  }

  filterJson(ev: any) {


   
    
    const val = ev.target.value;

    if (val && val.trim() != '')
    {

      console.log("In the filter")
      this.body = this.body.filter((item) => {
        
        return (item.food_menu.toLowerCase().indexOf(val.toLowerCase())> -1)
      }) 
    }

    else {
      console.log("Outside the filter")
      this.loadBody()

      
    }
    




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


  quantityAdd(food_item) {
    console.log ("-------QUATITY " + food_item.quantity)

    this.cartServ.quantityPlus(food_item);
  }

  quantityMinus(food_item) {
    if (food_item.quantity > 1) {
      this.cartServ.quantityMinus(food_item);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Quantity is 1, you cant reduce it.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }


  addTocart(food_item) {

    // console.log ("LETS SEE CATCODE PRICE " + this.catCode)
   

    this.priceVal = JSON.stringify(this.amountForm.value);
      console.log("LETS SEE THE LOGIN VAL " + this.priceVal)
      

      this.jsonBody = JSON.parse(this.priceVal);
      console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody)
      console.log("THIS IS THE SIGNUP VALUES" + this.jsonBody["price"])

      this.price = this.jsonBody["price"]
      console.log("PRICE FROM FORM" + this.jsonBody["price"])

        console.log("These are the items " + food_item);
        let pro = JSON.stringify(food_item);
        console.log("NOw strign " + pro);
        console.log("QUantity " + food_item.quantity);
        console.log("ITEM PRICE " + food_item.price);
    

    //ADDING NEW PRICE TO THE ITEM
    this.typed_price =  parseFloat(this.price).toFixed(2); 
    //this.typed_price =  this.price
    console.log (this.typed_price)
    let food_details = food_item
    
    if (this.typed_price !== 'NaN'){
    console.log("TYPED IN PRICE" + this.price);
    food_item.price =  parseFloat(parseFloat(this.price).toFixed(2));
    //item.price = parseInt(this.price)
    // console.log("NEW PRICE array " + food_details.new_food_price);
    console.log("NEW PRICE array " + food_details);
   console.log("NEW PRICE stringify " + JSON.stringify(food_details));
   console.log("item.price " + food_item.price);
    }



    if (food_item.quantity > '0'){
      console.log("food_item.price" + food_item.price);
      food_item.price =  food_item.price * food_item.quantity ;
      //item.price = parseInt(this.price)
      // console.log("NEW PRICE array " + food_details.new_food_price);
      console.log("NEW PRICE array " + food_details);
     console.log("NEW PRICE stringify " + JSON.stringify(food_details));
     console.log("item.price " + food_item.price);
      }

    //item.price =  parseFloat(item.price).toFixed(2);

    this.cartServ.addItem(food_details, food_item.quantity);

    console.log(this.cartServ.getAllCartfoodItems());

    this.count = this.cartServ.getAllCartfoodItems().length
    console.log("WHAT IS COUNT " + this.count)
  

    // this.navCtrl.push("FoodMenuPage",{ user_details: this.user_details})

    this.amountForm.reset()

  }

  lists(){
    
    this.navCtrl.push("ListPage",{customer_details: this.user_details})
  }


}
