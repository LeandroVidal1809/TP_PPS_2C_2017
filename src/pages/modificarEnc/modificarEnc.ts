import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ModalController, Modal, ModalOptions } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	
import { EncuestaPage } from '../encuesta/encuesta';	
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

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
  listavotacion: any;
  Mensaje:string;
  
  pregunta:string;
  pregunta2:string;
  resp1:string;
  resp2:string;
  tipo:string;
  tiempo:Date;
  tiempomodif:string;
  resp3:string;
yavoto=false;
  
  KeyUsuario:string;
  listadoU:Array<any>;
  perfil = {name : '',profilePicture: '',email: '',tipo:''};
  
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public translate: TranslateService,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
                private view: ViewController,
                private _auth:AngularFireAuth) {
               //  this.tienePermisos();
               this.yavoto=false;
               
               this.listavotacion = af.list('/encuesta/');
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
                      console.log("pregunta1:", this.pregunta);
                      this.tipo =   action.payload.val()["Tipo"];
                      this.tiempo =new Date() ;
                      console.log("tiempoencuesta:",this.tiempo);
                      this.resp1 =  action.payload.val()["Respuesta1"];
                      this.resp2 =  action.payload.val()["Respuesta2"];
                      this.resp3 =  action.payload.val()["Respuesta3"];
                      console.log(this.resp1,this.resp2,this.resp3);
                      this.KeyUsuario = action.key;


                      



                });  }) 
                var Observable = this.listavotacion.snapshotChanges(['child_changed'])
                .subscribe(actions => {
                actions.forEach(action => {
                    this.pregunta2 = action.payload.val()["Pregunta"];
                    console.log("pregunta2:", this.pregunta2);
                                  if(this.pregunta == this.pregunta2)
                                  {
                                    this.yavoto = true;
                                    this.KeyUsuario = action.key;
                                    
                                  }


                   




              });    this.cerrar(); })  
                
              
}
cerrar(){
if(this.yavoto  == true){

  if(this.translate.currentLang=="es"){
    this.showAlert("La encuesta a modificar ya fue iniciada!","Lo sentimos");                  }
if(this.translate.currentLang=="ja"){
this.showAlert("修正される調査はすでに開始されています！","ごめんなさい");   }
if(this.translate.currentLang=="it"){
this.showAlert("Il sondaggio da modificare è già iniziato!","Siamo spiacenti");   }
if(this.translate.currentLang=="po"){
this.showAlert("A pesquisa a ser modificada já começou!","Sentimos muito"); }
if(this.translate.currentLang=="en"){
this.showAlert("The survey to be modified has already started!","We are sorry");   }
if(this.translate.currentLang=="fr"){
this.showAlert("L'enquête à modifier a déjà commencé!","Nous sommes désolés");
}

  this.view.dismiss();
}
  
  
}
  tienePermisos()
  {
    if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
      {
        if(this.translate.currentLang=="es"){
          this.showAlert("No tiene permisos para ingresar como Profesores y Administrativos","Lo sentimos");                  }
    if(this.translate.currentLang=="ja"){
      this.showAlert("教授と管理者のABMに入る権限がありません。","ごめんなさい");   }
    if(this.translate.currentLang=="it"){
      this.showAlert("Non hai il permesso di entrare nell'ABM di professori e amministratori","Siamo spiacenti");   }
    if(this.translate.currentLang=="po"){
      this.showAlert("Você não tem permissão para entrar na ABM de Professores e Administradores","Sentimos muito"); }
    if(this.translate.currentLang=="en"){
      this.showAlert("You do not have permission to enter the ABM of Professors and Administrators","We are sorry");   }
    if(this.translate.currentLang=="fr"){
      this.showAlert("Vous n'êtes pas autorisé à entrer dans le guichet automatique des professeurs et des administrateurs","Nous sommes désolés");
    }
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
      if(this.translate.currentLang=="es"){
        this.showAlert("Debe ingresar una duracion","Lo sentimos");                  }
  if(this.translate.currentLang=="ja"){
    this.showAlert("教授と管理者のABMに入る権限がありません。","ごめんなさい");   }
  if(this.translate.currentLang=="it"){
    this.showAlert("Devi inserire una durata","Siamo spiacenti");   }
  if(this.translate.currentLang=="po"){
    this.showAlert("Você deve inserir uma duração","Sentimos muito"); }
  if(this.translate.currentLang=="en"){
    this.showAlert("You must enter a durations","We are sorry");   }
  if(this.translate.currentLang=="fr"){
    this.showAlert("Vous devez entrer une durée","Nous sommes désolés");
  }
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
       
  this.lista.remove(this.KeyUsuario);
  
  this.lista.push(
          { 
            Pregunta: this.pregunta,
            Tipo: this.tipo,
            HoraFina: this.tiempo.getHours()+ ":" +  this.tiempo.getMinutes(),
            Respuesta1:this.resp1,
            Respuesta2:this.resp2,
            Respuesta3:this.resp3,
         });console.log(this.KeyUsuario);
        
        
         if(this.translate.currentLang=="es"){
          this.showAlert("Se modifico exitosamente la encuesta","Exito");                  }
    if(this.translate.currentLang=="ja"){
      this.showAlert("調査は正常に変更されました","ごめんなさい");   }
    if(this.translate.currentLang=="it"){
      this.showAlert("Il sondaggio è stato modificato con successo","successo");   }
    if(this.translate.currentLang=="po"){
      this.showAlert("A pesquisa foi modificada com sucesso","Sucesso"); }
    if(this.translate.currentLang=="en"){
      this.showAlert("The survey was successfully modified","Success");   }
    if(this.translate.currentLang=="fr"){
      this.showAlert("L'enquête a été modifiée avec succès","Succès");
    }

         this.closeModal();
        
        

  }
  else
  {

    if(this.translate.currentLang=="es"){
      this.showAlert("Complete todos los campos","Lo sentimos");                  }
if(this.translate.currentLang=="ja"){
  this.showAlert("教授と管理者のABMに入る権限がありません。","ごめんなさい");   }
if(this.translate.currentLang=="it"){
  this.showAlert("Completa tutti i campi","Siamo spiacenti");   }
if(this.translate.currentLang=="po"){
  this.showAlert("Complete todos os campos","Sentimos muito"); }
if(this.translate.currentLang=="en"){
  this.showAlert("Complete all fields","We are sorry");   }
if(this.translate.currentLang=="fr"){
  this.showAlert("Complétez tous les champs","Nous sommes désolés");
}
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
      
               if(this.translate.currentLang=="es"){
                this.showAlert("Se borro correctamente la encuesta","Exito");                  }
          if(this.translate.currentLang=="ja"){
            this.showAlert("調査は正常に変更されました","ごめんなさい");   }
          if(this.translate.currentLang=="it"){
            this.showAlert("Il sondaggio è stato cancellato con successo","successo");   }
          if(this.translate.currentLang=="po"){
            this.showAlert("A pesquisa foi excluída com sucesso","Sucesso"); }
          if(this.translate.currentLang=="en"){
            this.showAlert("The survey was successfully deleted","Success");   }
          if(this.translate.currentLang=="fr"){
            this.showAlert("L'enquête a été supprimée avec succès","Succès");
          }
               this.closeModal();
       
       }

      MiSpiner():Loading
      {
        if(this.translate.currentLang=="es"){
          let loader = this.spiner.create({content:"Espere..", duration: 1000});               return loader;                  }
      if(this.translate.currentLang=="ja"){
        let loader = this.spiner.create({content:"待つ..", duration: 1000});    return loader;   }
      if(this.translate.currentLang=="it"){
        let loader = this.spiner.create({content:"aspettare..", duration: 1000});     return loader;   }
      if(this.translate.currentLang=="po"){
        let loader = this.spiner.create({content:"Espere..", duration: 1000});    return loader; }
      if(this.translate.currentLang=="en"){
        let loader = this.spiner.create({content:"waited..", duration: 1000});    return loader;   }
      if(this.translate.currentLang=="fr"){
        let loader = this.spiner.create({content:"Attendre..", duration: 1000});   return loader;
      }
      }


     
    
}
  

