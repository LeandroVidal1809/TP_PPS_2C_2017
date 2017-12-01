import { Component } from '@angular/core';
  import { NavController,NavParams,ModalController,ViewController, AlertController,Modal, ModalOptions } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { ExcelPage } from '../excel/excel';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { ConsultaPage } from '../consulta/consulta';
import { QRPage } from '../list/list';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AltaEncuesta } from '../alta-encuesta/alta-encuesta';
import { EncuestaPage } from '../encuesta/encuesta';
import { GraficosPage } from '../graficos/graficos';
import { ModificarEnc } from '../modificarEnc/modificarEnc';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
import { Modificar } from '../modificar/modificar';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NativeAudio } from '@ionic-native/native-audio';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-menuEncuesta',
  templateUrl: 'menuEncuesta.html'
})
export class MenuEncuesta {
  
perfil = {name : '',profilePicture: '',email: '',tipo:''};
super = true;
  constructor(      public alertCtrl: AlertController,   private view: ViewController,public platform: Platform,/* public push: Push, */public modalCtrl: ModalController,public navCtrl: NavController,
    private _auth:AngularFireAuth, public navParams: NavParams) {
      console.log(navParams);
      this.perfil=navParams.data;
      console.log("prueba perfil logeado:",this.perfil);
      this.tienePermisos();
    
  }

 
    encuesta(){
      const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
      let profileModal : Modal = this.modalCtrl.create(EncuestaPage, MyModalOption);
      profileModal.present(); 
    }
    
    closeModal(){
      this.view.dismiss();
        }
        tienePermisos()
        {
          if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo" && sessionStorage.getItem("type")!="profesor")
            {
              
              this.super = false;
                
               // this.navCtrl.setRoot(HomePage);
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
  redirect(path:string)
  {
    const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
    
    switch (path) {
        case 'Alta':

        let profileModal : Modal = this.modalCtrl.create(AltaEncuesta, MyModalOption);
        profileModal.present(); 
        //prueba de data en la entrada y salida del modal!
        
    //    this.navCtrl.push(QRPage);
        break;
        case 'Baja':    
      
      //  this.navCtrl.push(ExcelPage);
        break;
        case 'Modificar':
        profileModal = this.modalCtrl.create(ModificarEnc, MyModalOption);
        profileModal.present();
       // this.navCtrl.push(TomarFotoPage);
        break;
        case 'Encuesta Del Dia':
        profileModal = this.modalCtrl.create(EncuestaPage, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(TomarAsistenciaPage);
        break;  
        case 'Graficos':
        profileModal = this.modalCtrl.create(GraficosPage, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(TomarAsistenciaPage);
        break;
       
    

    }    
  }

ionViewDidLoad() {
  
    
     
            

    
  }
}
