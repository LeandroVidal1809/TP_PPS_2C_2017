import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireModule} from 'angularfire2';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

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
  constructor(private camera: Camera, public navCtrl: NavController,
     public navParams: NavParams, 
     private view: ViewController,db:AngularFireDatabase,
     private barcodeScanner: BarcodeScanner,
     private _auth:AngularFireAuth) {
    // If we navigated to this page, we will have an item available as a nav param
    this.listcodigos=db.list('/codigos');
   
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  CargarScann()
  {
   //this.existe=false;
  // this.cargo=false;
    
    this.options = { prompt : "Escanea tu Qr de Credito" }
    this.barcodeScanner.scan(this.options).then((barcodeData) =>
     {
        this.scanData=barcodeData;
         this.escaneado=barcodeData.text;

      
  
  
        }, (err) => {
      alert("Error occured : " + err);
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
