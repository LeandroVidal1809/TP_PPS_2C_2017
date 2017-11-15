import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
/**
 * Generated class for the ListaAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-asistencia',
  templateUrl: 'lista-asistencia.html',
})

export class ListaAsistenciaPage {
listado:Array<any>;
listadoP:Array<any>;
AulaFiltro:string;
MateriaFiltro:string;
ProfesorFiltro:string;
Presencia:boolean;
Fecha:Date;
list: AngularFireList<any>;
  constructor(public navCtrl: NavController,db:AngularFireDatabase, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
   this.Fecha =  new Date();
  var dia = this.Fecha.getDate();
  var mes = this.Fecha.getMonth();
  var anio = this.Fecha.getFullYear();

  debugger;
    this.listadoP=new Array<any>();
    this.listado=JSON.parse(sessionStorage.getItem("lista"));
    this.AulaFiltro = this.listado[0].Aula;
    this.MateriaFiltro=this.listado[0].Materia;
    this.list = db.list('/Listado/'+this.AulaFiltro+'-'+this.MateriaFiltro+'-'+dia+'-'+mes+'-'+anio);
    this.listado.forEach(element => {
     var objecto = {
       "Legajo":element.Legajo,
       "Nombre":element.Nombre,
       "Presente":false
     }

     debugger;  
     this.listadoP.push(objecto);
    });

//console.log("lista",this.listadoP);
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  Cambio(index:any){
    if(this.listadoP[index].Presente==false)
      {
        this.listadoP[index].Presente=true;
      }  
    else
    {
    this.listadoP[index].Presente=false;
    }

  }
  Cerrar(){
    sessionStorage.clear();
    this.navCtrl.setRoot(TomarAsistenciaPage); 

  }
  closeModal(){
    sessionStorage.clear();
    this.view.dismiss();
    
  //  this.navCtrl.setRoot(TomarAsistenciaPage);
      }

      
AgregarLista()
{
  console.log(this.listadoP);
  this.listadoP.forEach(element => {

    this.list.push({
      Legajo: element.Legajo,
      Nombre : element.Nombre,
      Presente: element.Presente});  
   });
   //s
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAsistenciaPage');
  }

}
