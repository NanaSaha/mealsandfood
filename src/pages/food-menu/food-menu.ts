import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@IonicPage()
@Component({
  selector: 'page-food-menu',
  templateUrl: 'food-menu.html',
})
export class FoodMenuPage {
  information: any[];

  constructor(private http: Http,public navCtrl: NavController, public navParams: NavParams) {

    let localData = http.get('assets/foods.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
      console.log("Information", this.information )
    })  
  }

  details(){
    this.navCtrl.push("ItemDetailsPage")
  }

  toggleSection(i) {
    console.log("Lets see I", i)
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    console.log("Lets see I J", i,j)
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }
 

}
