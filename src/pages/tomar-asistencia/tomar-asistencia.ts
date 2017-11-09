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
Aula:string;
miLista:Array<any>;
OpcionElegida:number;
opcion:number;

  constructor(public modalCtrl: ModalController,db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    var f = new Date();
    this.Fecha=   f.getDay() +"/"+ f.getMonth() +"/"+ f.getFullYear();
   this.OpcionElegida=0;
   this.miLista = new Array<any>();
    //this.list = db.list('/Alumnos');
  // console.log(this.list);
    // this.list.push({
    //   Apellido:"Fernandez",
    //   Nombre: "Juan",
    //   Aula:"202",
    //   Materia:"Programacion 2"});
    //      this.list.push({
    //   Apellido:"Lunatti",
    //   Nombre: "Fernando",
    //   Aula:"201",
    //   Materia:"Programacion 1"}); 
    this.list = db.list('/Alumnos');
    


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
    this.OpcionElegida=op;
  }
 async tomarAsistencia()
   { 
    switch(this.OpcionElegida){
      case 0://Aula
     await this.list.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
       if(action.payload.val()["Aula"]==+this.AulaSelect)
        {
            this.miLista.push(action.payload.val());
        }
        });
      });
      console.log(this.miLista);
      var listString =JSON.stringify(this.miLista);
      console.log(sessionStorage.setItem("lista",listString));
      break;
      case 1://Materia
      break;
      case 2://Profesor
      break;
      case 3://Alumno
      break;
      case 5://Fecha
      break;
    }
    const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false};
    let profileModal : Modal = this.modalCtrl.create(ListaAsistenciaPage,  MyModalOption);
    profileModal.present(); 

  }
}
