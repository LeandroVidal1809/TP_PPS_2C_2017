import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { ExcelPage } from '../excel/excel';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { QRPage } from '../list/list';

import { LoginPage } from '../login/login';
import { ImportarPage } from '../importar/importar';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }


  redirect(path:string)
  {
    switch (path) {
        case 'QR':
        this.navCtrl.push(QRPage);
        break;
        case 'Excel':
        this.navCtrl.push(ExcelPage);
        break;
        case 'Camara':
        this.navCtrl.push(TomarFotoPage);
        break;
        case 'Asistencia':
        this.navCtrl.push(TomarAsistenciaPage);
        break;  
    

    }    
  }
}
