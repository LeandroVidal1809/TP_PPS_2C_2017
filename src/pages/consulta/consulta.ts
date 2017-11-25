import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { ListaAsistenciaPage } from '../lista-asistencia/lista-asistencia';
import { ListaconsultaPage } from '../listaconsulta/listaconsulta';
import { AngularFireModule} from 'angularfire2';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ConsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {
  AulaSelect:string;
  MateriaSelect:string;
  AlumnoSelect:string;
  ProfesorSelect:string;
  Fecha:string;
  list: AngularFireList<any>;
  listProfesores: AngularFireList<any>;
  Aula:string;
  miLista:Array<any>;
  OpcionElegida:number;
  opcion:number;
  dbCon: AngularFireDatabase;
  constructor(public modalCtrl: ModalController,db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
   
    this.dbCon=db;
   
    var f = new Date();
    //this.Fecha=   f.getDay() +"/"+ f.getMonth() +"/"+ f.getFullYear();
    this.OpcionElegida=0;
    this.miLista = new Array<any>(); 
    
}  logOut(){
  console.log("deslogeando");
    this._auth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaPage');
  }


  setOpcion(op:number)
  {
    this.opcion=op;
    this.OpcionElegida=op;
  }

  async tomarAsistencia()
   {  

     this.list= this.dbCon.list('Listado/'+this.AulaSelect+'-'+ this.MateriaSelect +'-'+ this.Fecha + '/');
     var Observable = this.list.snapshotChanges(['child_added'])
          .subscribe(actions => {
          actions.forEach(action => {
            console.log(action.payload.val());      
            this.miLista.push(action.payload.val());
            var listString = JSON.stringify(this.miLista);
            if(listString!=null)
            sessionStorage.setItem("lista",listString);
            sessionStorage.setItem("Aula",this.AulaSelect);
            sessionStorage.setItem("Materia",this.MateriaSelect);
            sessionStorage.setItem("Fecha",this.Fecha);   
          });
          if(this.miLista.length!=0)
          {
            this.navCtrl.setRoot(ListaconsultaPage);
          }else{alert("la consulta no trajo datos");}
        
        });
          
     }
  


    
  }





















 
    // const MyModalOption : ModalOptions ={
    // enableBackdropDismiss : false};



   // switch(this.OpcionElegida){
    //   case 0://Aula
    //       var Observable = this.list.snapshotChanges(['child_added'])
    //           .subscribe(actions => {
    //           actions.forEach(action => {
    //             if(action.payload.val()["Aula"]==+this.AulaSelect)
    //             {
    //              console.log(action.payload.val());
    //              this.miLista.push(action.payload.val());
    //              var listString = JSON.stringify(this.miLista);
    //              if(listString!=null)
    //              sessionStorage.setItem("lista",listString);
                 
    //             }
    //           });
               
    //           if(this.miLista.length!=0)
    //             {
    //              this.navCtrl.setRoot(ListaAsistenciaPage);
    //           }else{alert("No hay lista cargada para su consulta");}
    //          });
             

    //   break;
    //   case 1://Materia
    
    //   var Observable = this.list.snapshotChanges(['child_added'])
    //   .subscribe(actions => { 
    //   actions.forEach(action => {
    //     if(action.payload.val()["Materia"]==this.MateriaSelect)
    //     {
    //      console.log(action.payload.val());
    //      this.miLista.push(action.payload.val());
    //      console.log("lista", this.miLista);
    //      var listString = JSON.stringify(this.miLista);
    //      if(listString!=null)
    //      sessionStorage.setItem("lista",listString);
         
    //     }
    //   });

    //   if(this.miLista.length!=0)
    //     {
    //   this.navCtrl.setRoot(ListaAsistenciaPage);
    //   }else{alert("No hay lista cargada para su consulta");}
    //   //  this.navCtrl.setRoot(ListaAsistenciaPage);
    //  });
    //   break;
    //   case 2://Profesor
    //   var Observable = this.listProfesores.snapshotChanges(['child_added'])
    //   .subscribe(actions => { 
    //   actions.forEach(action => {
    //     console.log(action.payload.val()["Apellido"]+","+action.payload.val()["Nombre"]);
    //     if(action.payload.val()["Apellido"]+","+action.payload.val()["Nombre"]==this.ProfesorSelect)
    //     {
    //           this.AulaSelect=action.payload.val()["Aula"];
    //           this.tomarAsistencia();
    //           this.OpcionElegida=0;
    //    } 
    //   });
    //  });
    //   break;
    //   case 3://Alumno
    //   var Observable = this.list.snapshotChanges(['child_added'])
    //   .subscribe(actions => { 
    //   actions.forEach(action => {
        
    //     if(action.payload.val()["Legajo"]==this.AlumnoSelect)
    //     {
    //           this.AulaSelect=action.payload.val()["Aula"];
    //           this.tomarAsistencia();
    //           this.OpcionElegida=0;
    //    } 
    //   });
    //   alert("No hay lista cargada para su consulta");
    //  });

    //   break;
    //   case 6://Aula-Materia
    //     var Observable = this.list.snapshotChanges(['child_added'])
    //     .subscribe(actions => { 
    //     actions.forEach(action => {
    //       if(action.payload.val()["Materia"]==this.MateriaSelect )
    //       {
    //         if(  action.payload.val()["Aula"]==+this.AulaSelect)
    //           {
    //           console.log(action.payload.val());
    //           this.miLista.push(action.payload.val());
    //           console.log("lista", this.miLista);
    //           var listString = JSON.stringify(this.miLista);
    //           if(listString!=null)
    //           sessionStorage.setItem("lista",listString);
    //         }
    //       }
    //      });
    //   if(this.miLista.length!=0)
    //     {
    //   this.navCtrl.setRoot(ListaAsistenciaPage);
    //   }
    //   else{
    //     alert("No hay lista cargada para su consulta");
    //   }
    // });
    //   break;
    