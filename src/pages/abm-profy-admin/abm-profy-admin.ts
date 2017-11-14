import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

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
                private view: ViewController) {
                  this.lista= af.list('/Usuarios/');
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
