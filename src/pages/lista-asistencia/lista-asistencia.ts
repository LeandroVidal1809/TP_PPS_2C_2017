import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
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
   
    this.listado=JSON.parse(sessionStorage.getItem("lista"));
    
    console.log(this.listado);
  }
  closeModal(){
   
    // localStorage.clear();
    this.navCtrl.setRoot(TomarAsistenciaPage);
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAsistenciaPage');
  }

}
