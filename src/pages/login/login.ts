import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
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

refresh(){
  this.menuCtrl.enable(false, 'prueba');
console.log("se");
}

  Logeate(){

    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.refresh();
  }

}
