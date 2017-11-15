import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
/**
 * Generated class for the AbmProfyAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abm-profy-admin',
  templateUrl: 'abm-profy-admin.html',
})
export class AbmProfyAdminPage {

  lista: any;
  legajo: string;
  nombre: string;
  tipo:string;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public af: AngularFireDatabase,
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.lista= af.list('/Usuarios/');
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmProfyAdminPage');
  }


  Guardar()
  {
    this.lista.push({
      Legajo: this.legajo,
      Nombre : this.nombre,
      Tipo: this.tipo

      });  

      this.legajo = "";
      this.nombre = "";
      this.tipo = "";
      

      alert("Se guardo el usuario correctamente");
  }

}
