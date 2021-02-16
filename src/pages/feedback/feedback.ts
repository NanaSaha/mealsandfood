import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, AlertController, ActionSheetController, Platform, Loading } from 'ionic-angular';
import { ApisProvider } from '../../providers/apis/apis';


import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public feedbackForm: any;
  from_menu: any;
  feedbackVal: any;
  jsonBody: any;
  params: any;
  body: any;
  requester_id;
  first_name;
  surname;
  messageList: any;
  api_code: any;
  from_login;
  from_login3
  user_details;
  last_name;
  user_id;


  constructor(public app: App, public actionSheetCtrl: ActionSheetController, public platform: Platform, public navCtrl: NavController, public apis: ApisProvider, public _form: FormBuilder, public toastCtrl: ToastController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.feedbackForm = this._form.group({

      "subject": ["", Validators.compose([Validators.required])],    
      "message": ["", Validators.compose([Validators.required])],
      
      
    });

    this.from_login = this.navParams.get("customer_details")
    
      //Checking if user data is shown / logged in
      if ( this.from_login == undefined){
        console.log("No Login - NO User Data");
    
  
      }

      else{

    this.user_details = JSON.parse(this.from_login )

    
    console.log("this.user_details " +  JSON.stringify(this.user_details))


    this.jsonBody = this.user_details; // this.jsonBody = JSON.parse(this.body);
    this.first_name = this.jsonBody[0].first_name
    this.last_name = this.jsonBody[0].last_name
    this.user_id = this.jsonBody[0].id

    console.log("first_name" +  this.first_name)
    
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }


  send_feedback() {

    this.feedbackVal = JSON.stringify(this.feedbackForm.value);

    this.jsonBody = JSON.parse(this.feedbackVal);

    console.log("THIS IS THE Feedback raw values VALUES" + this.feedbackVal)
    console.log("THIS IS THE Feedback VALUES " + this.jsonBody)


    

    this.params = {
      
      "user_id": this.user_id,
      "requester_name": this.first_name + " " + this.last_name,
      "subject": this.jsonBody.subject,
      "message": this.jsonBody.message,
      
    }

    console.log("this.params = " + JSON.stringify(this.params));

    let loader = this.loadingCtrl.create({
      content: "Please wait ..."

    });

    loader.present();


    this.apis.send_feedback(this.params).then((result) => {

      console.log("THIS IS THE RESULT" + result);
      console.log("result" + JSON.stringify(result));

      var resp_code = result["resp_code"];
      var resp_desc = result["resp_desc"];
      console.log(resp_code);
      console.log(resp_desc);


      this.messageList = resp_desc;
      this.api_code = resp_code;

      loader.dismiss();

      if (this.api_code == "000") {

          let alert = this.alertCtrl.create({
            title: "Feedback To M&F",
            subTitle:  this.messageList,
            buttons: [
              {
                text: 'OK', handler: () => {
                  this.navCtrl.setRoot("HomePage", { "customer_details": this.from_login });
                }
              }
  
            ]
          });
          alert.present();
        }

      if (this.api_code != "000") {
        this.showmessage(this.messageList);
      }

    }, (err) => {
      loader.dismiss();
      this.toastCtrl.create({
        message: "Could not process this request successfully.",
        duration: 5000
      }).present();

      console.log(err);
    });
   }


    showmessage(message) {
    let alert = this.alertCtrl.create({
      title: "Feeback",
      subTitle: message,
      buttons: [
        {
          text: 'OK', handler: () => { }
        }

      ]
    });
    alert.present();
  }


}

