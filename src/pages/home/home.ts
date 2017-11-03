import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { LoginPage } from '../login/login';
import { ImportarPage } from '../importar/importar';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  constructor(public menuCtrl: MenuController,public navCtrl: NavController) {

  redirect(){
    this.navCtrl.push(ImportarPage);
    
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
