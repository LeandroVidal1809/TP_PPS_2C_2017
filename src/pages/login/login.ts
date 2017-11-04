import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  seccionA = false;
  seccionB = true;
  classactivo = "";
  claseRegistrar:string;
  claseLogin:string;
  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {

    this.claseLogin="active";
    this.claseRegistrar="";
  }

refresh(){
  this.menuCtrl.enable(false, 'prueba');
console.log("se");
}

  Logeate(){

    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.refresh();
  }

  mortrarA(boton){
    console.log(this.seccionA);
    if (boton == "A"){
      this.seccionA = false;
      this.seccionB = true;
      this.claseLogin="active";
      this.claseRegistrar="";
    }
    else{
      this.seccionA = true;
      this.seccionB = false;
      this.claseLogin="";
      this.claseRegistrar="active";
    }
  }


  
  ABMAlumnos(){
    this.navCtrl.push(AbmProfyAdminPage);  
  }

}
