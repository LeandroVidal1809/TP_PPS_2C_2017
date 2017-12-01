import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ModalController, Modal, ModalOptions} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { EncuestaPage } from '../encuesta/encuesta';
import { ModificarEnc } from '../modificarEnc/modificarEnc';
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
               public af: AngularFireDatabase, public spiner:LoadingController,
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth,public modalCtrl: ModalController) {
                  if(sessionStorage.getItem("type")!="profesor" && sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
                    {
                        this.showAlert("No tiene permisos para ingresar a la generacion de la encuesta","Lo Sentimos");
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
Modificar(){
  const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false
  };
  let profileModal : Modal = this.modalCtrl.create(ModificarEnc, MyModalOption);
  profileModal.present(); 
  //prueba de data en la entrada y salida del modal!
}
  Guardar()
  {
      if(this.respuesta1 || this.respuesta2 || this.respuesta3)
        {this.dato= new Date();
          if(this.tiempo==null)
            {
              alert("Seleccione un tiempo de duracion");
              return;
            }
          switch(this.tiempo)
          {
            case '1 min':
            this.dato.setMinutes(this.dato.getMinutes()+2);
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
            this.showAlert("Atencion","Debe Cargar por lo menos una respuesta");
          }
          this.view.dismiss();
   }
  MiSpiner2():Loading
  {
    let loader = this.spiner.create({
      content:"Espere..",
      duration: 1000
      
    });
   // loader.present();
    return loader;
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
