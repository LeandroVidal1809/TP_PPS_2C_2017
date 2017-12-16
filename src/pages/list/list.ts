import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireModule} from 'angularfire2';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';

import { LoginPage } from '../login/login';
import { InfoProfesorPage } from '../info-profesor/info-profesor';

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

  constructor(  public alertCtrl: AlertController,public translate: TranslateService,public navCtrl: NavController,
     public navParams: NavParams, public modalCtrl: ModalController,
     private view: ViewController,db:AngularFireDatabase,
     private barcodeScanner: BarcodeScanner,
     private _auth:AngularFireAuth) 
  {   this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    console.log('Language changed to ' + this.translate.currentLang);
  });
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
  if(this.translate.currentLang=="es"){
    this.options = { prompt : "Escanea tu Qr de Credito" }             }
if(this.translate.currentLang=="ja"){
  this.options = { prompt : "あなたのクレジットカードをスキャンしてください" }   }
if(this.translate.currentLang=="it"){
  this.options = { prompt : "Scansiona il tuo credito Qr" }  }
if(this.translate.currentLang=="po"){
  this.options = { prompt : "Digitalize seu crédito Qr" } }
if(this.translate.currentLang=="en"){
  this.options = { prompt : "Scan your credit Qr" }  }
if(this.translate.currentLang=="fr"){
  this.options = { prompt : "Scannez votre crédit Qr" }
}
    
    this.barcodeScanner.scan(this.options).then((barcodeData) =>
     { 
        this.scanData=barcodeData;
    
       if(barcodeData.text=="alta-alumno"){

        let profileModal : Modal = this.modalCtrl.create(AbmAlumnosPage,MyModalOption);
               profileModal.present(); 

       }
       else if(barcodeData.text=="alta-administrador"){


        let profileModal : Modal = this.modalCtrl.create(AbmProfyAdminPage,MyModalOption);
               profileModal.present(); 

       }    
      else if(barcodeData.text=="alta-profesor"){
        let profileModal : Modal = this.modalCtrl.create(InfoProfesorPage,MyModalOption);
               profileModal.present(); 

       }else{if(this.translate.currentLang=="es"){
        this.showAlert("codigo qr no registrado!! reintentar")    ;       }
    if(this.translate.currentLang=="ja"){
    this.showAlert("QRコードが登録されていません！ 再試行") ; }
    if(this.translate.currentLang=="it"){
    this.showAlert("Codice QR non registrato !! riprovare");  }
    if(this.translate.currentLang=="po"){
    this.showAlert("QR code not registered !! tente novamente") ;}
    if(this.translate.currentLang=="en"){
    this.showAlert("qr code not registered !! retry");  }
    if(this.translate.currentLang=="fr"){
    this.showAlert("QR code non enregistré !! réessayer");
    }
      

       }
       


  
 });
  
  
  
}
showAlert(mensaje:string) {
  
  let alert = this.alertCtrl.create({

    subTitle: mensaje,
    buttons: ['OK']
  });
  alert.present();
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
