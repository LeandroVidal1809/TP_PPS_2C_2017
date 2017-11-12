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
AulaFiltro:string;
MateriaFiltro:string;
ProfesorFiltro:string;
Fecha:Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
   
    this.listado=JSON.parse(sessionStorage.getItem("lista"));
    this.AulaFiltro = this.listado[0].Aula;
    this.MateriaFiltro=this.listado[0].Materia;
    console.log("lista",this.listado);
  }
  
  Cerrar(){
    sessionStorage.clear();
    this.navCtrl.setRoot(TomarAsistenciaPage); 

  }
  closeModal(){
    sessionStorage.clear();
    this.view.dismiss();
    
  //  this.navCtrl.setRoot(TomarAsistenciaPage);
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAsistenciaPage');
  }

}
