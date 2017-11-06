import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

/**
 * Generated class for the ListaAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-asistencia',
  templateUrl: 'lista-asistencia.html',
})

export class ListaAsistenciaPage {
listado:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.listado= new Array<any>();
    this.listado.push({"apellido":"Vidal","nombre":"Leandro","Asistio":false});
    this.listado.push({"apellido":"Sorichetti","nombre":"Florencia","Asistio":false});
    this.listado.push({"apellido":"Adiliberti","nombre":"Pablo","Asistio":false});
    this.listado.push({"apellido":"Roberts","nombre":"Brian","Asistio":false});
    this.listado.push({"apellido":"Ruiz","nombre":"Pedro","Asistio":false});
    
  }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAsistenciaPage');
  }

}
