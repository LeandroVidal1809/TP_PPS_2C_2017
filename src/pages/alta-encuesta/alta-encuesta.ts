import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ModalController, Modal, ModalOptions} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { EncuestaPage } from '../encuesta/encuesta';
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
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;


  constructor(
    public navCtrl: NavController,
               public navParams: NavParams,
               public af: AngularFireDatabase,
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth,public modalCtrl: ModalController) {
                  this.tienePermisos();
                 
                    

                  this.lista= af.list('/altaEncuesta/');
  }
cargar()
{

  this.isValid=true;
  switch (this.tipoSelect) {
    case "CheckBox":
      this.select = true;
      break;
      case "Selector":
      this.select = true;
      break;
      case "RadioButton":
      this.select = true;
      break;
  
  }
}  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();this.view.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }

tienePermisos()
{
  if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo") 
    {
        this.showAlert("No tiene permisos para ingresar al ABM de Alumnos","Lo Sentimos");
        this.view.dismiss();   //this.navCtrl.setRoot(HomePage);
    }
    
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmAlumnosPage');
  }

  Guardar()
  {
    this.lista.push({
      Pregunta: this.pregunta,
      Tipo: this.tipoSelect,
      Respuesta1 : this.respuesta1,
      Respuesta2 : this.respuesta2,
      Respuesta3 : this.respuesta3,
      });  

      this.pregunta = "";
      this.respuesta1 = "";
      this.respuesta2 = "";
      this.respuesta3 = "";
    

      alert("Se guardo la encuesta correctamente");


      const MyModalOption : ModalOptions ={
        enableBackdropDismiss : false
      };
        let profileModal : Modal = this.modalCtrl.create(EncuestaPage, MyModalOption);
        profileModal.present(); 
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
