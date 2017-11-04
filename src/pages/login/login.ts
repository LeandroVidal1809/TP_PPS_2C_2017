import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {

    
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave(){
    this.menuCtrl.enable(true);
  }


  redirect(){
    this.navCtrl.push(HomePage);
  }
}
