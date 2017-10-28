import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  Redirect(){
    this.navCtrl.push(TomarAsistenciaPage);
    
  }
}
