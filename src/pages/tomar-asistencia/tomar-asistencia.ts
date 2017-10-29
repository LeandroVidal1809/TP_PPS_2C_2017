import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaAsistenciaPage } from '../lista-asistencia/lista-asistencia';

/**
 * Generated class for the TomarAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tomar-asistencia',
  templateUrl: 'tomar-asistencia.html',
})
export class TomarAsistenciaPage {
AulaSelect:string;
Fecha:string;
opcion:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var f = new Date();
    this.Fecha=   f.getDay() +"/"+ f.getMonth() +"/"+ f.getFullYear();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarAsistenciaPage');
  }

  setOpcion(op:number)
  {
    this.opcion=op;
  }
  tomarAsistencia()
  {
    this.navCtrl.push(ListaAsistenciaPage);
  }
}
