import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApisProvider } from '../../providers/apis/apis';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-createlist',
  templateUrl: 'createlist.html',
})
export class CreatelistPage {
  public listForm: any;
  formValues: any;
  jsonBody: any;
  jsonBody1: any;
  list;
  food_items: any;
  food: any;

  body1: any;
  params: any;
  body: any;
  user_id: any;
  user_details: any;
  from_checkout: any;

  list_items = { food_name: '', amount: ''}
  listdata;

  constructor(public toastCtrl: ToastController, public apis: ApisProvider, public _form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user_details = this.navParams.get("customer_details")

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.apis.retrieve_all_foods().then((result) => {
      this.food_items = result;

      console.log(this.food_items)
      console.log(JSON.stringify(this.food_items))
      console.log("Information", this.food_items)
      console.log("-------------------------------------------------------")
    });


    loader.dismiss();
   
    this.body = this.user_details
    this.jsonBody = JSON.parse(this.body);
    this.user_id = this.jsonBody[0].id
    console.log("USer DETAILS From LOGIN" + this.user_details)
    console.log("USer ID " + this.user_id)

    this.listForm = this._form.group({

      "food_name": ["", Validators.compose([Validators.required])],
      "amount": ["", Validators.compose([Validators.required])],
      
    })



  

   
  }



  foodChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    this.food = event.value
    console.log('Meal Id:', this.food.id);
    console.log('Meal Name:', this.food.name);
  }

  addtoList(){
  
    
    this.formValues = JSON.stringify(this.listForm.value);
      console.log("LETS SEE THE FORM VALUSE" + this.formValues)
  
      this.jsonBody = JSON.parse(this.formValues);
      console.log("THIS IS THE FORM VALUSE" + this.jsonBody)
      console.log("THIS IS THE FORM VALUSE STRINGIFY" + JSON.stringify(this.jsonBody))


    this.params = {

      "user_id": this.user_id,
      "food_name": this.food.name,
      "amount": this.jsonBody.amount,     
      "list_type": "Weekly"

    }

  
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    if (this.navParams.get('listDetails')) {

      this.apis.update_list(this.params).then((result) => {
        this.body1 = result;

        console.log("UPDATE LIST RESULTS" + result)
        console.log("UPDATE LIST RESULTS" + this.body1)
        
      });

      
     }

    else {
    this.apis.create_list(this.params).then((result) => {
   
      console.log("Results of list created" + result)
      console.log(result)
    });
  
    loader.dismiss();
 
    this.navCtrl.setRoot("ListPage",{customer_details: this.user_details})
  }
  }

}
