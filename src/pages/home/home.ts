import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  redirect(){
    this.navCtrl.push(TomarFotoPage);
    
  }
}
