import { Component } from '@angular/core';
  import { NavController,NavParams,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { ExcelPage } from '../excel/excel';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { ConsultaPage } from '../consulta/consulta';
import { QRPage } from '../list/list';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AltaEncuesta } from '../alta-encuesta/alta-encuesta';
import { EncuestaPage } from '../encuesta/encuesta';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
import { Modificar } from '../modificar/modificar';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NativeAudio } from '@ionic-native/native-audio';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import { MenuEncuesta } from '../menuEncuesta/menuEncuesta';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
perfil = {name : '',profilePicture: '',email: '',tipo:''};

  constructor(private nativeAudio: NativeAudio,public platform: Platform,/* public push: Push, */public modalCtrl: ModalController,public navCtrl: NavController,
    private _auth:AngularFireAuth, public navParams: NavParams) {
      console.log(navParams);
      this.perfil=navParams.data;
      console.log("prueba perfil logeado:",this.perfil);
      /* this.push.hasPermission().then((res: any) => {
        alert('prenotificacion');
        if (res.isEnabled) {
         alert('Tenes permisos de notificacion');
         const options: PushOptions = {
              android: {},
              ios: {
                  alert: 'true',
                  badge: true,
                  sound: 'false'
              },
              windows: {},
              browser: {
                  pushServiceURL: 'http://push.api.phonegap.com/v1/push'
              }
          };
          const pushObject: PushObject = this.push.init(options);
          pushObject.on('notification').subscribe((notification: any) => {
            alert(notification.message);
          });
          
          pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
          
          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


        } else {
          alert('No tenes permisos de notificacion');
        }
    
      }); */
      if(sessionStorage.getItem("type")=="admin") {
   
        this.perfil.profilePicture =  sessionStorage.getItem("foto");
      
      }
      else if(sessionStorage.getItem("type")=="profesor")  {
    
        this.perfil.profilePicture =  sessionStorage.getItem("foto");

      }
   
       if(sessionStorage.getItem("type")=="administrativo")  {
     
        this.perfil.profilePicture =  'assets/imgs/administrativo.jpg';
 
      }
      if(sessionStorage.getItem("type")=="alumno")  {
     
        this.perfil.profilePicture =  sessionStorage.getItem("foto");
     
      }



  }

  logOut(){
    
         this.nativeAudio.play('Silbido')
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
    encuesta(){const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
      let profileModal : Modal = this.modalCtrl.create(EncuestaPage, MyModalOption);
      profileModal.present(); 
    }
    modificar(){
      const MyModalOption : ModalOptions ={
        enableBackdropDismiss : false   };
       
      let profileModal : Modal = this.modalCtrl.create(Modificar, { data: this.perfil}, MyModalOption);
      profileModal.present(); 
      profileModal.onDidDismiss((data)=>{
        console.log("modificacion en home:",data);

        this.perfil.name = data.name;

        this.perfil.profilePicture = data.foto;
     
      })
      console.log(  this.perfil.profilePicture);
    }
  redirect(path:string)
  {
    const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
    
    switch (path) {
        case 'QR':
        sessionStorage.setItem("EmailProf",this.perfil.email);
        let profileModal : Modal = this.modalCtrl.create(QRPage, { data: this.perfil}, MyModalOption);
        profileModal.present(); 
        //prueba de data en la entrada y salida del modal!
        profileModal.onDidDismiss((data)=>{
          console.log(data);
        })
    //    this.navCtrl.push(QRPage);
        break;
        case 'Excel':    
        profileModal = this.modalCtrl.create(ExcelPage, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(ExcelPage);
        break;
        case 'Camara':
        profileModal = this.modalCtrl.create(TomarFotoPage, MyModalOption);
        profileModal.present();
       // this.navCtrl.push(TomarFotoPage);
        break;
        case 'Asistencia':
        profileModal = this.modalCtrl.create(TomarAsistenciaPage, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(TomarAsistenciaPage);
        break;  
        case 'Consulta':
        profileModal = this.modalCtrl.create(ConsultaPage, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(TomarAsistenciaPage);
        break;
        case 'Encuesta':
        profileModal = this.modalCtrl.create(MenuEncuesta, MyModalOption);
        profileModal.present();
      //  this.navCtrl.push(TomarAsistenciaPage);
        break;  
    

    }    
  }

ionViewDidLoad() {
  
    this.platform.ready().then(() => { 
  
      this.nativeAudio.preloadComplex('Silbido', "assets/sound/Silbido.mp3", 1, 1, 0).then(() => {     
       console.log("sonidocargado");
      });
     
            
    });this.nativeAudio.play('Silbido');
    
  }
}
