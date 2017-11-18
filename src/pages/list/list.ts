import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireModule} from 'angularfire2';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';

import { LoginPage } from '../login/login';

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

  perfil = {loggedin: false,name : '',profilePicture: '',email: ''};

  constructor(private camera: Camera, public navCtrl: NavController,
     public navParams: NavParams, 
     private view: ViewController,db:AngularFireDatabase,
     private barcodeScanner: BarcodeScanner,
     private _auth:AngularFireAuth) {  
       console.log(navParams);
      this.perfil=navParams.data;
      console.log("pruebaFB:",this.perfil);
    // If we navigated to this page, we will have an item available as a nav param
    this.listcodigos =db.list('/codigos');
  
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }

    scan()
    {
      this.options = { prompt : "Escanea tu Qr de Credito" }
      this.barcodeScanner.scan(this.options).then((barcodeData) =>
       {
          this.scanData=barcodeData;
           this.escaneado=barcodeData.text;
          }, (err) => {
        alert("Error occured : " + err);
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
         this.escaneado=barcodeData.text;
        console.log(this.escaneado);


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
 }
  
}
