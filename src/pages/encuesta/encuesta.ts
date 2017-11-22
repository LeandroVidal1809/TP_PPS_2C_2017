import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController, Modal, ModalOptions,LoadingController, Loading } from 'ionic-angular';

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

  resp1;
  resp2;
  resp3;

  pregunta;
  tipo;
  respSelect;
  buttonSelect;
  check1;
  check2;
  check3;

checkbox:boolean=false;
select:boolean=false;
button:boolean=false;
 
  list: AngularFireList<any>;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,public spiner:LoadingController,
     private view: ViewController, 
     private _auth:AngularFireAuth) {
   this.check1="";   this.check2="";   this.check3="";
   let espera = this.MiSpiner2();
   espera.present(); 
      this.list=db.list('/altaEncuesta');

      var Observable = this.list.snapshotChanges(['child_added'])
      .subscribe(actions => {
      actions.forEach(action => {
        this.pregunta = action.payload.val()["Pregunta"];
        console.log(this.pregunta);
      this.tipo =   action.payload.val()["Tipo"];
      this.resp1 =  action.payload.val()["Respuesta1"];
      this.resp2 =  action.payload.val()["Respuesta2"];
      this.resp3 =  action.payload.val()["Respuesta3"];
      console.log(this.resp1,this.resp2,this.resp3);
      }); 
      switch (this.tipo) {
        case "CheckBox":
          this.checkbox = true;
          break;
          case "RadioButton":
          this.button = true;
          break;
          case "Selector":
          this.select = true;
          break;
      
      }
    })

      
  }

  Guardar(){
  //  console.log(this.preg1,this.preg2,this.preg3);
  switch (this.tipo) {
  //  case "CheckBox":
   //   this.list=this.db.list('/encuesta');
   //   console.log("check select:" ,this.check1,this.check2,this.check3);
   //   this.list.push({
   //     alumno: sessionStorage.getItem("type"),
   //     Pregunta: this.pregunta,
  //      Tipo: this.tipo,
   //     check1: this.check1,
  //      check2: this.check2,
  //      check3: this.check3
      
  //    });
    //  break;
      case "RadioButton":
      this.list=this.db.list('/encuesta');
      console.log("button select:" ,this.buttonSelect);
      this.list.push({
        alumno: sessionStorage.getItem("type"),
        Pregunta: this.pregunta,
        Tipo: this.tipo,
      
    
        select: this.buttonSelect
      
      });
      break;
      case "Selector":
      this.list=this.db.list('/encuesta');
      this.list.push({
        alumno: sessionStorage.getItem("type"),
        Pregunta: this.pregunta,
        Tipo: this.tipo,
      
      select: this.respSelect
      
      });
      break;
  
  }
  
  
  
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
  MiSpiner2():Loading
  {
    let loader = this.spiner.create({
      content:"Espere..",
      duration: 3000
      
    });
   // loader.present();
    return loader;
  }

}
