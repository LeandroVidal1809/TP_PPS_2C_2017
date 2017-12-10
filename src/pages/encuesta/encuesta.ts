import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,AlertController, Modal, ModalOptions,LoadingController, Loading } from 'ionic-angular';

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
  yavoto:boolean=false;
vale:boolean=false;
Minuto:string;
Tiempo:string;
checkbox:boolean=false;
select:boolean=false;
button:boolean=false;
 hora:string;
 horaActual:Date;
  list: AngularFireList<any>;

  claseBoton: string;
  claseFoto:string;
  conteiner:string; 
  claseRadio:string; 
  textBox:string;  
  
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,    public alertCtrl: AlertController,public spiner:LoadingController,
     private view: ViewController, 
     private _auth:AngularFireAuth) {

      this.claseBoton= localStorage.getItem("claseBoton");
      this.claseFoto=localStorage.getItem("claseFoto");
      this.conteiner=localStorage.getItem("conteiner");
      this.claseRadio = localStorage.getItem("claseRadio");
      this.textBox = localStorage.getItem("textBox");
      //alert(this.textBox)
      console.log(this.textBox);

     this.check1="";   this.check2="";   this.check3="";
      this.Tiempo="0";
      this.Minuto="0";
    
     let espera = this.MiSpiner2();
   espera.present(); 
      this.list=db.list('/altaEncuesta');
      this.horaActual= new Date();
      var Observable = this.list.snapshotChanges(['child_added'])
      .subscribe(actions => {
      actions.forEach(action => {
        debugger;
        this.vale=false;
        this.hora =action.payload.val()["HoraFina"];
        var hora1= this.hora.split(":");
        if(+hora1[0] > this.horaActual.getHours())
          {
              this.vale=true;
          }
          else
            {
              if(+hora1[1] > this.horaActual.getMinutes())
              {
                this.vale=true;
              }
              else{
                this.vale=false;
              }
            }
       if(this.vale)
          {
            this.Minuto=hora1[1];
           this.Tiempo=hora1[0];
          this.pregunta = action.payload.val()["Pregunta"];
          console.log(this.pregunta);
          this.tipo =   action.payload.val()["Tipo"];
          this.resp1 =  action.payload.val()["Respuesta1"];
          this.resp2 =  action.payload.val()["Respuesta2"];
          this.resp3 =  action.payload.val()["Respuesta3"];
          console.log(this.resp1,this.resp2,this.resp3);
          }  
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
      if(this.vale=false)
        {
          this.showAlert("Encuestas Expiradas","NO HAY ENCUESTAS VIGENTES");
        }
    })

      
  }
  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
  Guardar(){
  //  console.log(this.preg1,this.preg2,this.preg3);
   

 
  switch (this.tipo) {

      case "RadioButton":
      console.log("radioopcion");
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
      console.log("selectoroption");
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
  if(this.yavoto == true)
  {
    this.showAlert("No permitido","usted ya voto!");
    
  }else{
    let profileModal : Modal = this.modalCtrl.create(GraficosPage, MyModalOption);
    profileModal.present(); 
    profileModal.onDidDismiss((voto)=>{
      console.log("grafico:",voto);
      this.yavoto = voto;
     })

  }
    
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
