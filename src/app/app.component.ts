import { Component, ViewChild } from '@angular/core';
import { Nav,Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 rootPage: string = "SlidersPage";
  //rootPage: string = "LoginPage";
  
  customer_details: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public event: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.event.subscribe('customer_details',(data)=>{
      this.customer_details = data
      console.log(data);
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage", icon: "ios-home"},
      { title: 'Orders', component: "OrderHistoryPage" , icon: "md-cart"},
      { title: 'Payments', component: "PaymentHistoryPage", icon: "md-cash" } ,
      { title: 'Lists', component: "ListPage" , icon: "ios-pizza"},
      // { title: 'Payments', component: "HomePage", icon: "md-cash" } 
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.setRoot(page.component, {'customer_details': this.customer_details});
  }


}
