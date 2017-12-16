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
import { Http } from '@angular/http';
import * as papa from 'papaparse';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-abm-alumnos',
  templateUrl: 'abm-alumnos.html',
})
export class AbmAlumnosPage {
  langs = ['en', 'fr', 'es'];
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
  seccionD = true;
  claseAlta:string;
  claseBaja:string;
  claseModificacion:string;
  claselista:string;

  listadoP:Array<any>;
  Modificar:boolean;
  KeyModificar;
  ListaNuevos:any;
 // public csvData: any[] = ['12344','12344','32432'];

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private http: Http, public translate: TranslateService,
               public af: AngularFireDatabase,
               public alertCtrl: AlertController,               
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                    console.log('Language changed to ' + this.translate.currentLang);
                  });
                  this.tienePermisos();
                  this.listadoP=new Array<any>();
                  this.ListaNuevos=new Array<any>();
                    
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
              //this.readCsvData();
              this.CargarLIsta();
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
      this.seccionD = true;
      this.claseAlta="active";
      this.claseBaja="";
      this.claseModificacion="";
      this.claselista ="";
        break;
      case "B":
      this.seccionA = true;
      this.seccionB = false;
      this.seccionC = true;
      this.seccionD = true;
      this.claseAlta="";
      this.claseBaja="active";
      this.claseModificacion="";
      this.claselista ="";
        break;
      case "C":
      this.seccionA = true;
      this.seccionB = true;
      this.seccionC = false;
      this.seccionD = true;
      this.claseAlta="";
      this.claseBaja="";
      this.claseModificacion="active";  
      this.claselista ="";     
        break;
        case "D":
        this.seccionA = true;
        this.seccionB = true;
        this.seccionC = true;
        this.seccionD = false;
        this.claseAlta="";
        this.claseBaja="";
        this.claseModificacion="";
        this.claselista ="active";

          break;
    
      default:
        break;
    }
  }

  CargarLIsta()
  {
    var objecto = {
      Legajo:"124334",
      Nombre:"Campaña, martin"
    }

    var objecto1 = {
      Legajo:"456544",
      Nombre:"Fernandez , leandro"
    }

    var objecto2 = {
      Legajo:"434333",
      Nombre:"Meza, Maximiliano"
    }

    var objecto3 = {
      Legajo:"324432",
      Nombre:"Barco, Ignacio Hernán"
    }

    var objecto4 = {
      Legajo:"123452",
      Nombre:"Giglioti, Manuel"
    }

    var objecto5 = {
      Legajo:"765343",
      Nombre:"Bustos, Patricio Andrés"
    }

    var objecto6 = {
      Legajo:"843432",
      Nombre:"Gutierrez, Emiliano Gabriel"
    }

      this.ListaNuevos.push(objecto);
      this.ListaNuevos.push(objecto1);
      this.ListaNuevos.push(objecto2);
      this.ListaNuevos.push(objecto3);
      this.ListaNuevos.push(objecto4);
      this.ListaNuevos.push(objecto5);
      this.ListaNuevos.push(objecto6);

      console.log(this.ListaNuevos);
  }


  GuardarLista()
  {
    this.ListaNuevos.forEach(element => {
      this.lista.push(element); 
      
    });

    this.showAlert("Se guardo correctamente la lista de alumnos","Exito");
  }


}
