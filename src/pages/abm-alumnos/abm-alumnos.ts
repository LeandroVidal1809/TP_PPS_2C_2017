import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
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
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.tienePermisos();
                    
                    
  
                  this.lista= af.list('/Alumno/');
  }

  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }

tienePermisos()
{
  if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
    {
        this.showAlert("No tiene permisos para ingresar al ABM de Alumnos","Lo Sentimos");
        this.view.dismiss();
        
       // this.navCtrl.setRoot(HomePage);
    }
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


  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
}
