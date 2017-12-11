import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
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
listAlumno: AngularFireList<any>;
listMaterias: AngularFireList<any>;
  constructor(public navCtrl: NavController,private db:AngularFireDatabase, public navParams: NavParams) {
    this.nombre=localStorage.getItem("Nombre");
    this.Foto=localStorage.getItem("Foto");

    this.listAlumno=db.list("/Alumno");
    this.listAlumno=db.list("/Materias");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
  }

}
