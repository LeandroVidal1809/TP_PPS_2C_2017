import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { GraficosPage } from '../graficos/graficos';
import { LoginPage } from '../login/login';

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

  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
     private view: ViewController,
     private _auth:AngularFireAuth) {
  }

  Guardar(){
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
