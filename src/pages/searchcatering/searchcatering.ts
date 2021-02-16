import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';

import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-searchcatering',
  templateUrl: 'searchcatering.html',
})
export class SearchcateringPage {

  locations: any[];
  location: any;
  jsonBody: any;
  body: any;
  body1: any;
  public searchForm: any;
  user_details: any;

  constructor( public _form: FormBuilder,public apis: ApisProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.user_details = this.navParams.get("user_details")

    this.searchForm = this._form.group({

    
      "location_name": ["", Validators.compose([Validators.required])]
    })

    
    this.apis.retrieve_all_locations().then((result) => {
      this.body = result;
      this.locations = this.body
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




  restaurants() {
    this.navCtrl.push("CateringlistPage", { location_id_value: this.location.id, location_name: this.location.location_name, user_details: this.user_details })
  }







}


