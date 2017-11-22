import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import firebase from 'firebase';  
import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
/**
 * Generated class for the ListaconsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaconsulta',
  templateUrl: 'listaconsulta.html',
})
export class ListaconsultaPage {
  listado:Array<any>;
  listadoP:Array<any>;
  AulaFiltro:string;
  urlPhoto:string;
  MateriaFiltro:string;
  ProfesorFiltro:string;
  Presencia:boolean;
  Fecha:Date;
  Fechas:string;
  public myPhotosRefLindas: any;
  list: AngularFireList<any>;
    constructor(public navCtrl: NavController,private db:AngularFireDatabase,public navParams: NavParams, private view: ViewController,
      private _auth:AngularFireAuth) {
     this.Fecha =  new Date();
     this.list= this.db.list('/FotoLista');
     this.myPhotosRefLindas = firebase.storage().ref('/Aulas/');
     this.listado=JSON.parse(sessionStorage.getItem("lista"));
      this.AulaFiltro = sessionStorage.getItem("Aula");
      this.MateriaFiltro=sessionStorage.getItem("Materia");
     this.Fechas=sessionStorage.getItem("Fecha");
      this.CargoFoto();

}

CargoFoto()
{
  // this.Fechas = this.Fechas.replace("-","/");
   let re = /\-/gi;
   let result = this.Fechas.replace(re, "/");
  debugger;
  var Observable = this.list.snapshotChanges(['child_added'])
  .subscribe(actions => {
  actions.forEach(action => {
    console.log(action.payload.val());      
    debugger;
    if(action.payload.val()['aula']==this.AulaFiltro && action.payload.val()['materia']==this.MateriaFiltro && result==action.payload.val()['fecha'])
      {
        debugger;
        this.urlPhoto=action.payload.val()['foto'];
       
      }              
  });
  
  })
}
    //sss
    Cerrar(){
      sessionStorage.clear();
      this.navCtrl.setRoot(TomarAsistenciaPage); 
  
    }
    logOut(){
      console.log("deslogeando");
        this._auth.auth.signOut();
        this.navCtrl.setRoot(LoginPage);
      }
    closeModal(){
      sessionStorage.clear();
      this.view.dismiss();
      
    //  this.navCtrl.setRoot(TomarAsistenciaPage);
        }
  
        


    downloadToPdf()
    {
    
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaconsultaPage');
  }

  ngOnInit() {
 
     }
   

 


}
