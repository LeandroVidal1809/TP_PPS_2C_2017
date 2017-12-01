import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireModule} from 'angularfire2';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
import { GraficosPage } from '../graficos/graficos';
import {Platform} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { LoginPage } from '../login/login';
import { InfoProfesorPage } from '../info-profesor/info-profesor';
import { InfoAlumnoPage } from '../info-alumno/info-alumno';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class QRPage {
  scanData : {};
  encodeData : string ;
  encodedData : {} ;
  escaneado:string;
  listcodigos: AngularFireList<any>;
  options :BarcodeScannerOptions;


  Profesor= {Email: "",Aula : '',Materia: '',Apellido: '',Nombre: ''};  


  perfil = {loggedin: false,name : '',profilePicture: '',email: ''};

  constructor( private nativeAudio: NativeAudio,public platform: Platform,public navCtrl: NavController,
     public navParams: NavParams, public modalCtrl: ModalController,
     private view: ViewController,db:AngularFireDatabase,
     private barcodeScanner: BarcodeScanner,
     private _auth:AngularFireAuth) 
  {  
      this.perfil=navParams.data;
 

      this.listcodigos =db.list('/codigos');
      
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }

    scan()
    {
     
      this.barcodeScanner.scan().then(barcodeData => {
      
        }, (err) => {
        console.log('Error: ', err);
    });
}
  
    CargarScann()
  {
   //this.existe=false;
  // this.cargo=false;
    
  const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false
  };
 
    this.options = { prompt : "Escanea tu Qr de Credito" }
    this.barcodeScanner.scan(this.options).then((barcodeData) =>
     { 
        this.scanData=barcodeData;
    
       if(barcodeData.text=="alta-alumno"){

        let profileModal : Modal = this.modalCtrl.create(InfoAlumnoPage,MyModalOption);
               profileModal.present(); 

       }
       else if(barcodeData.text=="alta-administrador"){
        this.nativeAudio.play('Silbido');

        let profileModal : Modal = this.modalCtrl.create(GraficosPage,MyModalOption);
               profileModal.present(); 

       }    
      else if(barcodeData.text=="alta-profesor"){
        let profileModal : Modal = this.modalCtrl.create(InfoProfesorPage,MyModalOption);
               profileModal.present(); 

       }else{
          alert("codigo qr no registrado!! reintentar");

       }
       


  
 });
  
  
  
}

  closeModal(){
    const myData ={
      name: 'Leandro',
      ocupacion: 'saliendo'
    };

    this.view.dismiss(myData);
  }
 ionViewWillLoad(){
const data = this.navParams.get('data');
console.log(data);

this.platform.ready().then(() => { 
  
      this.nativeAudio.preloadComplex('Silbido', "assets/sound/Silbido.mp3", 1, 1, 0).then(() => {     
       console.log("sonidocargado");
      });
     
            
    });
 }
 
  
}




// this.listcodigos.subscribe(items => 
//   {
//     items.forEach(item =>
//      {

//       if(this.escaneado==item.codigo)
//       {


   

//        alta-alumno
//        let profileModal : Modal = this.modalCtrl.create(AbmAlumnosPage,MyModalOption);
//       profileModal.present(); 
//          alta-profesor
//        let profileModal : Modal = this.modalCtrl.create(AbmProfyAdminPage,MyModalOption);
//        profileModal.present(); 
//         alta-administrativo
//        let profileModal : Modal = this.modalCtrl.create(AbmProfyAdminPage, MyModalOption);
//        profileModal.present(); 
//       }
    
//       });
//   });
