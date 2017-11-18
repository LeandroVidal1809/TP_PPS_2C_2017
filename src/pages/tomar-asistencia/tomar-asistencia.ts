import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { ListaAsistenciaPage } from '../lista-asistencia/lista-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';


/**
 * Generated class for the TomarAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tomar-asistencia',
  templateUrl: 'tomar-asistencia.html',
})
export class TomarAsistenciaPage {
AulaSelect:string;
MateriaSelect:string;
AlumnoSelect:string;
ProfesorSelect:string;
OpcionesAvanzadas:Boolean;
Fecha:string;
list: AngularFireList<any>;
listProfesores: AngularFireList<any>;
Aula:string;
miLista:Array<any>;
OpcionElegida:number;
opcion:number;

  constructor(public modalCtrl: ModalController,db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
    this.list = db.list('/Alumno');
    this.listProfesores=db.list('/Profesores');
    var f = new Date();
    this.Fecha=   f.getDay() +"/"+ f.getMonth() +"/"+ f.getFullYear();
    this.OpcionElegida=0;
    this.miLista = new Array<any>(); 
    this.OpcionesAvanzadas=false;
}
logOut(){
  console.log("deslogeando");
    this._auth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
  closeModal(){
this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TomarAsistenciaPage');
    this.miLista = new Array<any>(); 
  }

  setOpcion(op:number)
  {
    this.opcion=op;
    this.OpcionElegida=op;
  }

  async tomarAsistencia()
   {  
     
    const MyModalOption : ModalOptions ={
    enableBackdropDismiss : false};

    switch(this.OpcionElegida){
      case 0://Aula
          var Observable = this.list.snapshotChanges(['child_added'])
              .subscribe(actions => {
              actions.forEach(action => {
                if(action.payload.val()["Aula"]==+this.AulaSelect)
                {
                 console.log(action.payload.val());
                 this.miLista.push(action.payload.val());
                 var listString = JSON.stringify(this.miLista);
                 if(listString!=null)
                 sessionStorage.setItem("lista",listString);
                 
                }
              });
               
              if(this.miLista.length!=0)
                {
                 this.navCtrl.setRoot(ListaAsistenciaPage);
              }else{alert("No hay lista cargada para su consulta");}
             });
             

      break;
      case 1://Materia
    
      var Observable = this.list.snapshotChanges(['child_added'])
      .subscribe(actions => { 
      actions.forEach(action => {
        if(action.payload.val()["Materia"]==this.MateriaSelect)
        {
         console.log(action.payload.val());
         this.miLista.push(action.payload.val());
         console.log("lista", this.miLista);
         var listString = JSON.stringify(this.miLista);
         if(listString!=null)
         sessionStorage.setItem("lista",listString);
         
        }
      });

      if(this.miLista.length!=0)
        {
      this.navCtrl.setRoot(ListaAsistenciaPage);
      }else{alert("No hay lista cargada para su consulta");}
      //  this.navCtrl.setRoot(ListaAsistenciaPage);
     });
      break;
      case 2://Profesor
      var Observable = this.listProfesores.snapshotChanges(['child_added'])
      .subscribe(actions => { 
      actions.forEach(action => {
        console.log(action.payload.val()["Apellido"]+","+action.payload.val()["Nombre"]);
        if(action.payload.val()["Apellido"]+","+action.payload.val()["Nombre"]==this.ProfesorSelect)
        {
              this.AulaSelect=action.payload.val()["Aula"];
              this.tomarAsistencia();
              this.OpcionElegida=0;
       } 
      });
     });
      break;
      case 3://Alumno
      var Observable = this.list.snapshotChanges(['child_added'])
      .subscribe(actions => { 
      actions.forEach(action => {
        
        if(action.payload.val()["Legajo"]==this.AlumnoSelect)
        {
              this.AulaSelect=action.payload.val()["Aula"];
              this.tomarAsistencia();
              this.OpcionElegida=0;
       } 
      });
      alert("No hay lista cargada para su consulta");
     });

      break;
      case 6://Aula-Materia
        var Observable = this.list.snapshotChanges(['child_added'])
        .subscribe(actions => { 
        actions.forEach(action => {
          if(action.payload.val()["Materia"]==this.MateriaSelect )
          {
            if(  action.payload.val()["Aula"]==+this.AulaSelect)
              {
              console.log(action.payload.val());
              this.miLista.push(action.payload.val());
              console.log("lista", this.miLista);
              var listString = JSON.stringify(this.miLista);
              if(listString!=null)
              sessionStorage.setItem("lista",listString);
            }
          }
         });
      if(this.miLista.length!=0)
        {
      this.navCtrl.setRoot(ListaAsistenciaPage);
      }
      else{
        alert("No hay lista cargada para su consulta");
      }
    });
      break;
    }



  }

  ChangeOpciones()
  {
   if(this.OpcionesAvanzadas==true) 
    {
      this.OpcionesAvanzadas=false;
    }
    else
      this.OpcionesAvanzadas=true;
  }
  }


  // this.list.push({
  //   Nombre: "Prueba Desarrollo",
  //   Aula : 201 ,
  //   Dia:"Sabado",
  //   HorarioI:"15:30",
  //   Horariof:"23:00",
  //   NumeroDia:6
  //   });  