import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { ListaAsistenciaPage } from '../lista-asistencia/lista-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

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
list: AngularFireList<any>;

opcion:number;
  constructor(public modalCtrl: ModalController,db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    var f = new Date();
    this.Fecha=   f.getDay() +"/"+ f.getMonth() +"/"+ f.getFullYear();
   
   debugger;
    this.list = db.list('/Alumnos');
    this.list.push({
      Apellido:"Vidal",
      Nombre: "Leandro",
      Aula:"201",
      Materia:"Programacion 1"});
      
  }

  closeModal(){
this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarAsistenciaPage');
  }

  setOpcion(op:number)
  {
    this.opcion=op;
  }
  tomarAsistencia()
  { const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false};
    let profileModal : Modal = this.modalCtrl.create(ListaAsistenciaPage,  MyModalOption);
    profileModal.present(); 

  }
}
