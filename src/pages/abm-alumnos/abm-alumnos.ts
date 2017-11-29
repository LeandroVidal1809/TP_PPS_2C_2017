import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Console } from '@angular/core/src/console';
import { Alert } from 'ionic-angular/components/alert/alert';
import { elementDef } from '@angular/core/src/view/element';
import { List } from 'ionic-angular/components/list/list';


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

  exite = false;
  ListaLegajos : Array<any>;  
  seccionA = false;
  seccionB = true;
  seccionC = true;
  claseAlta:string;
  claseBaja:string;
  claseModificacion:string;

  listadoP:Array<any>;
  Modificar:boolean;
  KeyModificar;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public af: AngularFireDatabase,
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.tienePermisos();
                  this.listadoP=new Array<any>();
                    
                  this.ListaLegajos = new Array<any>();
                  this.lista= af.list('/Alumno/');
                  var Observable = this.lista.snapshotChanges(['child_added'])
                  .subscribe(actions => {
                    actions.forEach(action => {

                  this.ListaLegajos.push(action.payload.val()["Legajo"]);
                  this.listadoP.push(action.key);
                  var objecto = {
                         "Legajo":action.payload.val()["Legajo"],
                         "Nombre":action.payload.val()["Nombre"],
                         "Key":action.key
                       }

                  this.listadoP.push(objecto);
                  });
              })
              this.claseAlta="active";
              this.Modificar = false;
              // this.lista.forEach(element => {
              //   var objecto = {
              //     "Legajo":element.Legajo,
              //     "Nombre":element.Nombre
              //   }
           
                  
              //   this.listadoP.push(objecto);
              // })
            //  console.log(this.listadoP);


  }

  logOut(){
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

  }

  Guardar()
  {

    this.exite = false;
    if(this.legajo != "" ||  this.nombre != "")
    {
        for (let index = 0; index < this.ListaLegajos.length; index++) 
        {
         if(this.ListaLegajos[index]== this.legajo)
         {

            this.exite = true;
         }
        }

    }
    else
    {
      this.showAlert("Complite todos los campos","Lo Sentimos");
    }

    if(this.exite)
    {
      this.showAlert("El numero de legajo ya exite","Lo Sentimos");
    }
    else
    {
      this.lista.push({
        Nombre : this.nombre,
        Legajo : this.legajo,
        }); 
      this.showAlert("Se guardo correctamente el alumno","Exito");
    }
  }

  Guardar2()
  {
    
    if(this.legajo != "")
    {
        for (let index = 0; index < this.listadoP.length; index++) 
        {
         if(this.listadoP[index].Legajo == this.legajo)
         {

          this.lista.remove(this.listadoP[index].Key);
          this.showAlert("Se elimino","Exito");
         }
         
        }

    }
    else
    {
      this.showAlert("Complite todos los campos","Lo Sentimos");
    }

  }
  
  Buscar()
  {
    if(this.legajo != "")
    {
        for (let index = 0; index < this.listadoP.length; index++) 
        {
         if(this.listadoP[index].Legajo == this.legajo)
         {
          this.legajo = this.listadoP[index].Legajo;
          this.nombre = this.listadoP[index].Nombre;
          this.KeyModificar = this.listadoP[index].Key;
          this.Modificar = true;
         }
         
        }

    }
    else
    {
      this.showAlert("Complite todos los campos","Lo Sentimos");
    }
  }

  Guardar3()
  {
      if(this.nombre != "")
      {
        this.lista.update(this.KeyModificar,
         { 
           Nombre: this.nombre
        })
        this.showAlert("Se guardo correctamente el alumno","Exito");
      }
      else
      {
        this.showAlert("Complite todos los campos","Lo Sentimos");
      }
  }


  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  mortrarA(boton)
  {
    

    switch (boton) {
      case "A":
      this.seccionA = false;
      this.seccionB = true;
      this.seccionC = true;
      this.claseAlta="active";
      this.claseBaja="";
      this.claseModificacion="";
        break;
      case "B":
      this.seccionA = true;
      this.seccionB = false;
      this.seccionC = true;
      this.claseAlta="";
      this.claseBaja="active";
      this.claseModificacion="";
        break;
      case "C":
      this.seccionA = true;
      this.seccionB = true;
      this.seccionC = false;
      this.claseAlta="";
      this.claseBaja="";
      this.claseModificacion="active";       
        break;
    
      default:
        break;
    }
  }
}
