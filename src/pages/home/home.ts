import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController) {

    
  }

refresh(){
  this.menuCtrl.enable(true, 'prueba');

}
  Login()
  {
    this.navCtrl.push(LoginPage);  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.refresh();
  }
}
