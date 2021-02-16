import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  NavParams,
  Events,
} from "ionic-angular";
import {
  ApisProvider,
  CartService,
  CartItem,
  FoodCartService,
  FoodCartItem,
} from "../../providers/apis/apis";
import {
  ToastController,
  LoadingController,
  ModalController,
  ActionSheetController,
} from "ionic-angular";
import { removeSummaryDuplicates } from "@angular/compiler";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  cartList: Array<CartItem>;
  cartList2: Array<FoodCartItem>;
  user_details: any;
  jsonBody: any;
  body: any;
  user_id: any;
  params;
  order_date: any;
  food_order_date: any;
  count;
  first_name;
  homeOpened: number;
  points;
  redeemable_amount;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public cartServ2: FoodCartService,
    public cartServ: CartService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public apis: ApisProvider,
    public event: Events,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.user_details = this.navParams.get("customer_details");
    //Checking if user data is shown / logged in
    if (this.user_details == undefined) {
      console.log("No Login - NO User Data");
     
      // let profileModal = this.modalCtrl.create("InfoPage");
      // profileModal.present();

      // let actionSheet = this.actionSheetCtrl.create({
      //   title: 'Important Notice',
      //   buttons: [
      //     {
      //       text: 'Read',
      //       role: 'Read',
      //       handler: () => {
      //         let profileModal = this.modalCtrl.create("InfoPage");
      //           profileModal.present();
      //         console.log('Read clicked');
      //       }
      //     },
      //     {
      //       text: 'Cancel',
      //       role: 'cancel',
      //       handler: () => {
      //         console.log('Cancel clicked');
      //       }
      //     }
      //   ]
      // });

      // actionSheet.present();
    } else {
      this.event.publish("customer_details", this.user_details);
      this.body = this.user_details;
      this.jsonBody = JSON.parse(this.body);
      this.user_id = this.jsonBody[0].id;
      this.first_name = this.jsonBody[0].first_name;
      console.log("USer DETAILS " + this.user_details);
      console.log("USer ID " + this.user_id);
      console.log("first_name" + this.first_name);

      console.log("REMOVE CART");
      this.cartServ.removeallcart();
      this.cartServ2.removeallfoodcart();
      this.count = this.cartServ.getAllCartItems().length;

      this.params = {
        user_id: this.user_id,
      };

      let loader = this.loadingCtrl.create({
        content: "Please wait ...",
      });

      loader.present();

      //Retrieve Loyalty Points
      this.apis.retrieve_loyalty_points(this.params).then(
        (result) => {
          console.log(result);

          this.points = result[0].points;
         this.redeemable_amount = result[0].redeemable_amount;
            console.log("points,redeemable_amount " + this.points ,  this.redeemable_amount);
         
          }
      )
        //END Retrieve Loyalty Points

      this.apis.order_history(this.params).then(
        (result) => {
          console.log(result);

          if (result["resp_code"] == "112") {
            this.toastCtrl
              .create({
                message: "No Meals Order History Available Yet",
                duration: 3000,
              })
              .present();
          } else {
            this.order_date = result[0].order_date;
            console.log("LETS SEE LIST order_date " + this.order_date);
          }
        },

        (err) => {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: "Sorry, cant connect right now. Please try again!",
            buttons: ["OK"],
          });
          alert.present();

          this.toastCtrl
            .create({
              message: "Please check your internet connection",
              duration: 5000,
            })
            .present();
          loader.dismiss();
          console.log(err);
        }
      );

      this.apis.food_order_history(this.params).then(
        (result) => {
          console.log(result);

          if (result["resp_code"] == "112") {
            this.toastCtrl
              .create({
                message: "No Orders Available yet",
                duration: 3000,
              })
              .present();
          } else {
            this.food_order_date = result[0].order_date;
            console.log(
              "LETS SEE LIST food_order_date " + this.food_order_date
            );
          }
        },

        (err) => {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: "Sorry, cant connect right now. Please try again!",
            buttons: ["OK"],
          });
          alert.present();

          this.toastCtrl
            .create({
              message: "Please check your internet connection",
              duration: 5000,
            })
            .present();
          loader.dismiss();
          console.log(err);
        }
      );

      loader.dismiss();
    }
  }

  notice() {
    let profileModal = this.modalCtrl.create("InfoPage");
    profileModal.present();
  }

  catering() {
    this.navCtrl.push("SearchcateringPage", { user_details: this.user_details });
    // let alert = this.alertCtrl.create({
    //   title: "M&F",
    //   subTitle: "Coming Soon..",
    //   buttons: ["OK"],
    // });
    // alert.present();
  }

  food() {
    this.navCtrl.push("FoodMenuPage", { user_details: this.user_details });
  }

  meals() {
    this.navCtrl.push("SearchMealsPage", { user_details: this.user_details });
  }

  loyalty() {
      this.navCtrl.push("LoyaltyPage", { user_details: this.user_details, points: this.points , redeemable_amount: this.redeemable_amount});
  }

  check_orders() {
    this.navCtrl.push("OrderHistoryPage", {
      customer_details: this.user_details,
    });
  }
}
