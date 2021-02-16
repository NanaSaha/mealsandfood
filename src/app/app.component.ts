import { Component, ViewChild } from '@angular/core';
import { Nav,Events, Platform,AlertController,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 rootPage: string = "SlidersPage";
  //rootPage: string = "LoginPage";
  
  customer_details: any;
  jsonBody;
  first_name;
  last_name;

  pages: Array<{title: string, component: any,feature: string, icon: string}>;
  pages2: Array<{title: string, component: any,feature: string, icon: string}>;
  
  signal_app_id: string = '8536d8e3-ae88-4e02-bd20-7f9e9563081b';
  firebase_sender_id: string = '564321132968';
  
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,public event: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.event.subscribe('customer_details',(data)=>{
      this.customer_details = data

      console.log(this.customer_details);
      //Checking if user data is shown / logged in
      if ( this.customer_details == undefined){
        console.log("No Login - NO User Data");
    

      }
      else{

        console.log("CUSTOMER DETAILS HERE" + this.customer_details);
        console.log(data); 
        this.jsonBody = JSON.parse(this.customer_details);
         this.first_name = this.jsonBody[0].first_name
         this.last_name = this.jsonBody[0].last_name
        console.log("FIRST NAME" +  this.first_name);
        
      }

    });


    // used for an example of ngFor and navigation
    
    this.pages = [
      { title: 'Home', component: "HomePage", feature: "dev", icon: "ios-home"},
      { title: 'Orders', component: "OrderHistoryPage" , feature: "dev", icon: "md-cart"},
      { title: 'Payments History', component: "PaymentHistoryPage", feature: "dev",icon: "md-cash" } ,
      { title: 'Create Lists', component: "ListPage" ,feature: "dev", icon: "ios-pizza"},
      { title: 'Give Feedback', component: "FeedbackPage" ,feature: "dev", icon: "ios-pizza"},
      { title: 'Contact M&F', component: "ContactPage" , feature: "dev", icon: "ios-pizza"},
     // { title: 'Logout', component: null , feature: "done", icon: "ios-pizza"},
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.oneSignal.startInit(this.signal_app_id, this.firebase_sender_id);

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      // this.oneSignal.handleNotificationReceived().subscribe((res) => {
      //   // do something when notification is received
      //   console.log(res)
      // });

      // this.oneSignal.handleNotificationOpened().subscribe((res) => {
      //   // do something when a notification is opened
      //   console.log(res)
      // });

      // this.oneSignal.endInit();
    });

  
  }

 

  edit(item) {

    this.nav.setRoot("ProfilePage", { customer_details: this.customer_details });

  }

  login(item) {

    this.nav.push("LoginPage", { cart_or_sidemenu: "sidemenu" });

  }



  openPage(page) {
    if (page.component) {
      // this.nav.push(page.component);
      this.nav.setRoot(page.component, {'customer_details': this.customer_details});
    } else {
      // Since the component is null, this is the logout option

      console.log(`feature = ${page.feature} AND title = ${page.title}`);
      if (page.feature == "done") {
        this.logout_func();
      }


    }
  }

  logout_func() {
    // logout logic
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you wish to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Logging out...",
              duration: 1000
            });

            loader.present();

            setTimeout(() => {
              console.log("logging out in 1 second");
             
              this.nav.setRoot("LoginPage", { cart_or_sidemenu: "sidemenu" });

            }, 1000);

            setTimeout(() => {
              loader.dismiss();
            }, 800);

          }
        }
      ]
    });
    confirm.present();
  }


}
