import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ModalController, Modal, ModalOptions} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { EncuestaPage } from '../encuesta/encuesta';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
/**
 * Generated class for the AbmAlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-encuesta',
  templateUrl: 'alta-encuesta.html',
})
export class AltaEncuesta {
  isValid:boolean=false;
  lista: any;
  pregunta: string;
  tipoSelect: string;
  checkbox:boolean=false;
  select:boolean=false;
  escrito:boolean=false;
  tiempo:string;
  dato:Date;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;


  constructor(
    public navCtrl: NavController,
               public navParams: NavParams,
               public af: AngularFireDatabase, public spiner:LoadingController,public translate: TranslateService,
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth,public modalCtrl: ModalController) {
                  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                    console.log('Language changed to ' + this.translate.currentLang);
                  });
                  if(sessionStorage.getItem("type")!="profesor" && sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
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
                        this.view.dismiss();
                    }
                    else
                    {
                  let espera = this.MiSpiner2();
                  espera.present();   
                  this.dato= new Date();
                  this.lista= af.list('/altaEncuesta/');
                  }
  }
cargar()
{

}  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();this.view.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmAlumnosPage');
  }

  Guardar()
  {
      if(this.respuesta1 || this.respuesta2 || this.respuesta3)
        {
          if(this.tiempo==null)
            {
              if(this.translate.currentLang=="es"){
              this.showAlert("Seleccione un tiempo de duracion","Lo sentimos");                  }
        if(this.translate.currentLang=="ja"){
          this.showAlert("継続時間を選択する","ごめんなさい");   }
        if(this.translate.currentLang=="it"){
          this.showAlert("Seleziona una durata","Siamo spiacenti");   }
        if(this.translate.currentLang=="po"){
          this.showAlert("Selecione um tempo de duração","Sentimos muito"); }
        if(this.translate.currentLang=="en"){
          this.showAlert("Select a duration time","We are sorry");   }
        if(this.translate.currentLang=="fr"){
          this.showAlert("Sélectionnez une durée","Nous sommes désolés");
        }
        
              return;
            }
          switch(this.tiempo)
          {
            case '1 min':
            this.dato.setMinutes(this.dato.getMinutes()+1);
            break;
            case '10 min':
            this.dato.setMinutes(this.dato.getMinutes()+10);
            break;
            case '45 min':
            this.dato.setMinutes(this.dato.getMinutes()+45);
            break;

          }
          switch(this.tipoSelect)
          {
            case 'Menu de Seleccion':
            this.tipoSelect="Selector";
            break;
            case 'Botones opcion':
            this.tipoSelect="RadioButton";
            break;
            case 'Respuesta Texto':
            this.tipoSelect="Text";
            break;

          }
          

      this.lista.push({
      Pregunta: this.pregunta,
      Tipo: this.tipoSelect,
      HoraFina: this.dato.getHours()+ ":" +  this.dato.getMinutes(),
      Respuesta1 : this.respuesta1,
      Respuesta2 : this.respuesta2,
      Respuesta3 : this.respuesta3,
      });  
      
  this.pregunta = "";
      this.respuesta1 = "";
      this.respuesta2 = "";
      this.respuesta3 = "";
    

      this.showAlert("Proceso finalizado","Se cargo correctamente")

    
   
      }
        else
          {
            if(this.translate.currentLang=="es"){
              this.showAlert("Atencion","Debe Cargar por lo menos una respuesta");           }
      if(this.translate.currentLang=="ja"){
        this.showAlert("注意","少なくとも1つの回答をアップロードする必要があります");   }
      if(this.translate.currentLang=="it"){
        this.showAlert("Attenzione","Devi caricare almeno una risposta");   }
      if(this.translate.currentLang=="po"){
        this.showAlert("Atenção","Você deve enviar pelo menos uma resposta"); }
      if(this.translate.currentLang=="en"){
        this.showAlert("Attention","You must upload at least one response");   }
      if(this.translate.currentLang=="fr"){
        this.showAlert("Attention","Vous devez télécharger au moins une réponse");
      }
       
          }
          this.view.dismiss();
   }
  MiSpiner2():Loading
  {if(this.translate.currentLang=="es"){
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
  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
}
