import { Component } from '@angular/core';
import { NavController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { ExcelPage } from '../excel/excel';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { QRPage } from '../list/list';

import { LoginPage } from '../login/login';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public modalCtrl: ModalController,public navCtrl: NavController) {
  }

 

  redirect(path:string)
  {
    const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
    const myData ={
      name: 'Brian',
      ocupacion: 'entrando'
    };
    switch (path) {
        case 'QR':
        let profileModal : Modal = this.modalCtrl.create(QRPage, { data: myData}, MyModalOption);
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
    

    }    
  }
}
