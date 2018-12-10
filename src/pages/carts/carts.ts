import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApisProvider, CartService, CartItem } from '../../providers/apis/apis';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-carts',
  templateUrl: 'carts.html',
})
export class CartsPage {
  cartList: Array<CartItem>;
  check: any;
  params: any;
  params2: any;
  select: any;
  orders: any;
  orderJson: any;
  order_id: any;
  user_details: any;

  jsonBody: any;
  body: any;
  user_id: any;
  body2: any;
  address_details: any;
  address_user_id: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public apis: ApisProvider, public cartServ: CartService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.user_details = this.navParams.get("user_details")
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS " + this.user_details)
    console.log("USer ID " + this.user_id)

    let loader = this.loadingCtrl.create({
      content: "Getting Cart Details ..."

    });

    loader.present();

    // Checking if user has address already
    this.params = {
      "user_id": this.user_id
    }

    this.apis.retrieve_address_details(this.params).then((result) => {
      this.body2 = result;
      this.address_details = JSON.stringify(this.body2)
      this.address_user_id = this.body2[0]
      console.log(this.body2)
      console.log(this.address_details)
      console.log("USER ID " + this.address_user_id.resp_code )

    });

    // retrieving all the cart items

    this.cartList = cartServ.getAllCartItems();
    this.select = JSON.stringify(this.cartList)
    loader.dismiss();

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
        subTitle: 'Quantity is 1, you cant reduce it, if you want to remove, please press remove button.',
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


  getTotal(): number {
    this.check = this.cartServ.getGrandTotal()
    return this.cartServ.getGrandTotal();
  }



  checkout(item) {

    // let prod_details = this.cartList
    // let orders = {};
    // let new_list = [];

    // for (let x in prod_details) {
    //   new_list.push({ 'meals_id': prod_details[x]['meals_id'], 'quantity': prod_details[x]['quantity'] })
    // }

    // orders = new_list

    // console.log(new_list);
    // console.log(JSON.stringify(orders));


    // this.params = {
    //   "user_id": this.user_id,
    //   "orders": orders
    // }

    // let loader = this.loadingCtrl.create({
    //   content: "Please wait ...",
    // });

    // loader.present();

    // console.log("PARAMS + ");
    // console.log(this.params);

    // this.apis.process_order(this.params).then((result) => {

    //   console.log('LETS RESULTS ' + result);
    //   console.log(result);
    //   var body1 = result;

    //   this.orderJson = JSON.stringify(body1)
    //   this.order_id = body1['order_id']

    //   console.log('LETS SEE THE PROCESS ORDER ' + this.orderJson);
    //   console.log('LETS SEE THE ORDER ID IN PROCESS ORDER ' + this.order_id);


    //   this.params2 = {
    //     "order_id": this.order_id,

    //   }
    //   console.log("ORDER ID BEFOR PASSING IT " + this.params2)

    //   this.apis.display_orders(this.params2).then((result) => {

    //     console.log('LETS RESULTS ');
    //     console.log(result);
    //     var body1 = result;

    //     this.orderJson = JSON.stringify(body1)

    //     console.log('LETS SEE THE DISPLAY ORDER JSON ' + this.orderJson);

    //     loader.dismiss();

        if (this.address_user_id.user_id > 0) { 
          this.navCtrl.push("CheckoutPage",

          { user_details: this.user_details ,order_id: this.order_id});

        }
         else {
          this.navCtrl.push("AddressPage",{ order_id: this.order_id,user_details: this.user_details });

        }

       


  //     });

  //   });


   }

}
