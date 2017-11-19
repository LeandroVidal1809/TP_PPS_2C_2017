import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';

import { AngularFireAuthModule,AngularFireAuth } from 'angularfire2/auth';
import { GraficosPage } from '../graficos/graficos';
import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

/**
 * Generated class for the EncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {

  preg1;
  preg2;
  preg3;
 
  list: AngularFireList<any>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
     private view: ViewController, 
     private _auth:AngularFireAuth) {


      this.list=db.list('/encuesta');
  }

  Guardar(){
    console.log(this.preg1,this.preg2,this.preg3);
    
    this.list.push({
      alumno: sessionStorage.getItem("type"),
      respuesta1: this.preg1,
      respuesta2: this.preg2,
     respuesta3: this.preg3,
    });
this.grafico();
  
    }
grafico(){

  const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false
  };
    let profileModal : Modal = this.modalCtrl.create(GraficosPage, MyModalOption);
    profileModal.present(); 
}

  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmProfyAdminPage');
  }

}
