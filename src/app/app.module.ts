import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApisProvider, CartService, FoodCartService,CateringCartService } from '../providers/apis/apis';
import { IonicStorageModule,Storage } from '@ionic/storage';
// import { OneSignal } from '@ionic-native/onesignal'; 

import { Angular4PaystackModule } from 'angular4-paystack';



@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    BrowserModule,
    IonicSelectableModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Angular4PaystackModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
  ],
  providers: [
    
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApisProvider,
    CartService,
    FoodCartService,
    CateringCartService
    // OneSignal
  ]
})
export class AppModule {}
