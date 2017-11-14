import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the AbmAlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abm-alumnos',
  templateUrl: 'abm-alumnos.html',
})
export class AbmAlumnosPage {

  lista: any;
  legajo: string;
  nombre: string;
  horario:string;
  aulaSelect:string;
  materiaSelect:string;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public af: AngularFireDatabase,
                private view: ViewController) {
                  this.lista= af.list('/Alumno/');
  }


  closeModal(){
    this.view.dismiss();
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmAlumnosPage');
  }

  Guardar()
  {
    this.lista.push({
      Legajo: this.legajo,
      Nombre : this.nombre,
      Aula: this.aulaSelect,
      Materia: this.materiaSelect,
      Horario:  this.horario
      });  

      this.legajo = "";
      this.nombre = "";
      this.aulaSelect= "";
      this.materiaSelect= "";
      this.horario = "";

      alert("Se guardo el alumno correctamente");
  }

}
