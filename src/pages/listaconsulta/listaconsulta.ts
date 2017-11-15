import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
/**
 * Generated class for the ListaconsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaconsulta',
  templateUrl: 'listaconsulta.html',
})
export class ListaconsultaPage {
  listado:Array<any>;
  listadoP:Array<any>;
  AulaFiltro:string;
  MateriaFiltro:string;
  ProfesorFiltro:string;
  Presencia:boolean;
  Fecha:Date;
  Fechas:string;
  list: AngularFireList<any>;
    constructor(public navCtrl: NavController,db:AngularFireDatabase, public navParams: NavParams, private view: ViewController,
      private _auth:AngularFireAuth) {
     this.Fecha =  new Date();
      this.listado=JSON.parse(sessionStorage.getItem("lista"));
      this.AulaFiltro = sessionStorage.getItem("Aula");
      this.MateriaFiltro=sessionStorage.getItem("Materia");
     this.Fechas=sessionStorage.getItem("Fecha");
  //console.log("lista",this.listadoP);
    }
    //sss
    Cerrar(){
      sessionStorage.clear();
      this.navCtrl.setRoot(TomarAsistenciaPage); 
  
    }
    logOut(){
      console.log("deslogeando");
        this._auth.auth.signOut();
        this.navCtrl.setRoot(LoginPage);
      }
    closeModal(){
      sessionStorage.clear();
      this.view.dismiss();
      
    //  this.navCtrl.setRoot(TomarAsistenciaPage);
        }
  
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaconsultaPage');
  }

}
