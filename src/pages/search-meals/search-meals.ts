import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';

import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-search-meals',
  templateUrl: 'search-meals.html',
})
export class SearchMealsPage {

  locations: any[];
  location: any;
  meals: any[];
  meal: any;
  jsonBody: any;
  body: any;
  body1: any;
  public searchForm: any;
  user_details: any;

  constructor( public _form: FormBuilder,public apis: ApisProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.user_details = this.navParams.get("user_details")

    this.searchForm = this._form.group({

      "name": ["", Validators.compose([Validators.required])],
      "location_name": ["", Validators.compose([Validators.required])]
    })

    
    this.apis.retrieve_all_locations().then((result) => {
      this.body = result;
      this.locations = this.body
    });

    this.apis.retrieve_all_menu().then((result) => {
      this.body1 = result;
      this.meals = this.body1
    });

  }



  locationChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    this.location = event.value
    console.log('Location Id:', this.location.id);
    console.log('Location Name:', this.location.location_name);
  }



  mealChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    this.meal = event.value
    console.log('Meal Id:', this.meal.id);
    console.log('Meal Name:', this.meal.name);
  }


  restaurants() {
    this.navCtrl.push("RestaurantsPage", { location_id_value: this.location.id, location_name: this.location.location_name, user_details: this.user_details })
  }







}










/// A function to remember

  // medClicked(event, item) {
  //   this.myInput = item;
  //   this.items = this.items.filter((item) => {

  //   return item;
  //   })
  //   }
