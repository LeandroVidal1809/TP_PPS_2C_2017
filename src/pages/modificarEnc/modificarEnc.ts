import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ModalController, Modal, ModalOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	
import { EncuestaPage } from '../encuesta/encuesta';	


import { LoginPage } from '../login/login';
import { swipeShouldReset } from 'ionic-angular/util/util';
/**
 * Generated class for the AbmProfyAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarEnc',
  templateUrl: 'modificarEnc.html',
})
export class ModificarEnc {

  lista: any;
  Mensaje:string;
  
  pregunta:string;
  resp1:string;
  resp2:string;
  tipo:string;
  tiempo:Date;
  tiempomodif:string;
  resp3:string;
  
  KeyUsuario:string;
  listadoU:Array<any>;
  perfil = {name : '',profilePicture: '',email: '',tipo:''};

  claseBoton: string;
  claseFoto:string;
  conteiner:string; 
  claseRadio:string; 
  
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
                private view: ViewController,
                private _auth:AngularFireAuth) {

                  this.claseBoton= localStorage.getItem("claseBoton");
                  this.claseFoto=localStorage.getItem("claseFoto");
                  this.conteiner=localStorage.getItem("conteiner");
                  this.claseRadio = localStorage.getItem("claseRadio");
               //  this.tienePermisos();
                  this.lista= af.list('/altaEncuesta/');
                  console.log(navParams);
                
                 // this.perfil=navParams.data;
                  console.log("prueba perfil logeado:",this.perfil);
                /*   this.email = this.perfil.email;
                  this.nombre = this.perfil.name;
                  this.foto = this.perfil.profilePicture
                  this.tipo =this.perfil.tipo; */
                  this.listadoU=new Array<any>();
                  var Observable = this.lista.snapshotChanges(['child_added'])
                  .subscribe(actions => {
                  actions.forEach(action => {
                      this.pregunta = action.payload.val()["Pregunta"];
                      console.log(this.pregunta);
                      this.tipo =   action.payload.val()["Tipo"];
                      this.tiempo =new Date() ;
                      console.log("tiempoencuesta:",this.tiempo);
                      this.resp1 =  action.payload.val()["Respuesta1"];
                      this.resp2 =  action.payload.val()["Respuesta2"];
                      this.resp3 =  action.payload.val()["Respuesta3"];
                      console.log(this.resp1,this.resp2,this.resp3);
                      this.KeyUsuario = action.key;
                }); 
              

                
  })  
}

  tienePermisos()
  {
    if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
      {
          this.showAlert("No tiene permisos para ingresar al ABM de Profesores y Administrativos","Lo sentimos");
          this.view.dismiss(); // this.navCtrl.setRoot(HomePage);    
      }
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }
      showAlert(mensaje:string,titulo:string) {
        
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensaje,
          buttons: ['OK']
        });
        alert.present();
      }
      
  ionViewDidLoad() {
    console.log('ionViewDidLoad modificar');
  
  }

Modificar(){


 
  if(this.pregunta != "" || this.resp1 != ""|| this.resp2 != ""|| this.resp3 != "")
  {
    if(this.tiempomodif==null)
    {
      alert("Seleccione un tiempo de duracion");
      return;
    }
   switch(this.tiempomodif)
  {
    case '1 min':
    this.tiempo.setMinutes(this.tiempo.getMinutes()+1);
    break;
    case '10 min':console.log("entro a modificar");
    this.tiempo.setMinutes(this.tiempo.getMinutes()+10);

    break;
    case '45 min':
    this.tiempo.setMinutes(this.tiempo.getMinutes()+45);
    break;

  } console.log("tiempomodificado:",this.tiempo);
        this.lista.update(this.KeyUsuario,
          { 
            Pregunta: this.pregunta,
            Tipo: this.tipo,
            HoraFina: this.tiempo.getHours()+ ":" +  this.tiempo.getMinutes(),
            Respuesta1:this.resp1,
            Respuesta2:this.resp2,
            Respuesta3:this.resp3,
         });console.log(this.KeyUsuario);
         this.showAlert("Se modifico exitosamente la encuesta","Exito");
         this.closeModal();
        
        

  }
  else
  {
    this.showAlert("Complite todos los campos","Lo Sentimos");
  }

}
  
encuesta(){
  const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false
  };
    let profileModal : Modal = this.modalCtrl.create(EncuestaPage, MyModalOption);
    profileModal.present(); 
}

  showAlertRegistrar(mensaje:string,titulo:string) {
    
        switch(mensaje)
        {
          
          case "The email address is badly formatted.":
          {
    
            mensaje="El email no contiene un formato correcto";
            break;
          }
         
    
        }
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensaje,
          buttons: ['OK']
        });
        alert.present();
      }  
      Borrar(){
        
               this.lista.remove(this.KeyUsuario);
               this.showAlert("Se borro correctamente la encuesta","Exito");
               this.closeModal();
       
       }

      MiSpiner():Loading
      {
        let loader = this.spiner.create({
          content:"Espere..",
          duration: 25000
          
        });
        return loader;
      }


     
    
}
  

