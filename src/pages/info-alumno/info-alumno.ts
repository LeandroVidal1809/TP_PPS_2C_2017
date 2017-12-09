import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-alumno',
  templateUrl: 'info-alumno.html',
})
export class InfoAlumnoPage {
nombre:string;
Foto:string;

claseBoton: string;
claseFoto:string;
conteiner:string; 
claseRadio:string; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre=localStorage.getItem("Nombre");
    this.Foto=localStorage.getItem("Foto");

    this.claseBoton= localStorage.getItem("claseBoton");
    this.claseFoto=localStorage.getItem("claseFoto");
    this.conteiner=localStorage.getItem("conteiner");
    this.claseRadio = localStorage.getItem("claseRadio");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
  }

}
