import { Component } from '@angular/core';
import { NavController,NavParams,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { ExcelPage } from '../excel/excel';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { ConsultaPage } from '../consulta/consulta';
import { QRPage } from '../list/list';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { EncuestaPage } from '../encuesta/encuesta';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
perfil = {loggedin: false,name : '',profilePicture: '',email: ''};

  constructor(private push: Push,public modalCtrl: ModalController,public navCtrl: NavController,
    private _auth:AngularFireAuth, public navParams: NavParams) {
      console.log(navParams);
      this.perfil=navParams.data;
      console.log("pruebaFB:",this.perfil);
      this.push.hasPermission().then((res: any) => {
    
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
          alert('No tenes ermisos de notificacion');
        }
    
      });
    
  }

  logOut(){
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
  redirect(path:string)
  {
    const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
    
    switch (path) {
        case 'QR':
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
    

    }    
  }
}
