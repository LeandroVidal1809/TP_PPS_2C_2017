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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre=localStorage.getItem("Nombre");
    this.Foto=localStorage.getItem("Foto");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
  }

}
