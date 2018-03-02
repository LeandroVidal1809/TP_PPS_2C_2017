import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { ListaAsistenciaPage } from '../lista-asistencia/lista-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


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
  //Propiedades
AulaSelect:string;
MateriaSelect:string;
AlumnoSelect:string;
ProfesorSelect:string;
OpcionesAvanzadas:Boolean;
MuestraMaterias:boolean;
MuestraAulas:boolean;
Fecha:string;
list: AngularFireList<any>;
listaMateria: AngularFireList<any>;
listProfesores: AngularFireList<any>;
Aula:string;
miLista:Array<any>;
miListaMaterias:Array<any>;
f:Date;
OpcionElegida:number;
opcion:number;
//Constructor
  constructor(public translate: TranslateService,   public alertCtrl: AlertController,public modalCtrl: ModalController,db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log('Language changed to ' + this.translate.currentLang);
      });
   
      //Lista de Alumnos
    this.list = db.list('/Alumno');
    
    //Lista de Profesores
    this.listProfesores=db.list('/Profesores');
    //Lista de Materias
    this.listaMateria=db.list('/Materias');
    this.f = new Date();
    this.Fecha=   this.f.getDay() +"/"+ this.f.getMonth() +"/"+ this.f.getFullYear();
    this.OpcionElegida=0;
    this.miLista = new Array<any>(); 
    this.miListaMaterias = new Array<any>(); 
    this.OpcionesAvanzadas=false;
    this.MuestraMaterias=false;
    
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
  ChangeOpciones()
  {
    
   if(this.OpcionesAvanzadas==true) 
    {
      this.OpcionesAvanzadas=false;
    }
    else
      this.OpcionesAvanzadas=true;
  }
  Traigo(tipo:string)
  {
    this.miListaMaterias= new Array<any>();
    if(tipo=='Materias'){
    if(this.MuestraMaterias)
      {
        return;
      }
      else
        {
          this.MuestraMaterias=true;
          this.MuestraAulas=false;
        }
    }
    else
      {
        if(this.MuestraAulas)
          {
            return;
          }
          else
            {
              this.MuestraMaterias=false;
              this.MuestraAulas=true;
            }
      }
    var Observable = this.listaMateria.snapshotChanges(['child_added'])
    .subscribe(actions => {
    actions.forEach(action => { console.log(action.payload.val());
      debugger;
      console.log(this.f.getDay());
      if(action.payload.val()["NumeroDia"]==+this.f.getDay() 
        && this.dateCompare(action.payload.val()["HorarioI"]+":00",this.f.getHours() +":"+this.f.getMinutes()+":"+this.f.getSeconds())==-1
        && this.dateCompare(action.payload.val()["Horariof"]+":00",this.f.getHours() +":"+this.f.getMinutes()+":"+this.f.getSeconds())==1)
      {
       this.miListaMaterias.push(action.payload.val()); 
      }
    });
     
    if(this.miListaMaterias.length!=0)
      {
      }else{
        if(this.translate.currentLang=="es"){
          this.showAlert("No hay Materias en curso en este momento.")    ;       }
      if(this.translate.currentLang=="ja"){
      this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
      if(this.translate.currentLang=="it"){
      this.showAlert("No Matters in corso in questo momento");  }
      if(this.translate.currentLang=="po"){
      this.showAlert("Nenhuma matéria em curso neste momento") ;}
      if(this.translate.currentLang=="en"){
      this.showAlert("No Matters underway at this time");  }
      if(this.translate.currentLang=="fr"){
      this.showAlert("Aucun sujet en cours pour le moment");
      }
        
        
    
    
    
    
    
    }
   });
   

  }

  dateCompare(time1,time2) {
    var t1 = new Date();
    var parts = time1.split(":");
    t1.setHours(parts[0],parts[1],parts[2],0);
    var t2 = new Date();
    parts = time2.split(":");
    t2.setHours(parts[0],parts[1],parts[2],0);
  
    // returns 1 if greater, -1 if less and 0 if the same
    if (t1.getTime()>t2.getTime()) return 1;
    if (t1.getTime()<t2.getTime()) return -1;
    return 0;
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
              }else{   if(this.translate.currentLang=="es"){
                this.showAlert("No hay lista cargada para su consulta")    ;       }
            if(this.translate.currentLang=="ja"){
            this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
            if(this.translate.currentLang=="it"){
            this.showAlert("Non esiste una lista caricata per la tua richiesta");  }
            if(this.translate.currentLang=="po"){
            this.showAlert("Não há lista carregada para sua consulta") ;}
            if(this.translate.currentLang=="en"){
            this.showAlert("There is no loaded list for your inquiry");  }
            if(this.translate.currentLang=="fr"){
            this.showAlert("Il n'y a pas de liste chargée pour votre demande");
            }}
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
      }else{   if(this.translate.currentLang=="es"){
        this.showAlert("No hay lista cargada para su consulta")    ;       }
    if(this.translate.currentLang=="ja"){
    this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
    if(this.translate.currentLang=="it"){
    this.showAlert("Non esiste una lista caricata per la tua richiesta");  }
    if(this.translate.currentLang=="po"){
    this.showAlert("Não há lista carregada para sua consulta") ;}
    if(this.translate.currentLang=="en"){
    this.showAlert("There is no loaded list for your inquiry");  }
    if(this.translate.currentLang=="fr"){
    this.showAlert("Il n'y a pas de liste chargée pour votre demande");
    }}
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
      if(this.translate.currentLang=="es"){
        this.showAlert("No hay lista cargada para su consulta")    ;       }
    if(this.translate.currentLang=="ja"){
    this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
    if(this.translate.currentLang=="it"){
    this.showAlert("Non esiste una lista caricata per la tua richiesta");  }
    if(this.translate.currentLang=="po"){
    this.showAlert("Não há lista carregada para sua consulta") ;}
    if(this.translate.currentLang=="en"){
    this.showAlert("There is no loaded list for your inquiry");  }
    if(this.translate.currentLang=="fr"){
    this.showAlert("Il n'y a pas de liste chargée pour votre demande");
    }
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
        if(this.translate.currentLang=="es"){
          this.showAlert("No hay lista cargada para su consulta")    ;       }
      if(this.translate.currentLang=="ja"){
      this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
      if(this.translate.currentLang=="it"){
      this.showAlert("Non esiste una lista caricata per la tua richiesta");  }
      if(this.translate.currentLang=="po"){
      this.showAlert("Não há lista carregada para sua consulta") ;}
      if(this.translate.currentLang=="en"){
      this.showAlert("There is no loaded list for your inquiry");  }
      if(this.translate.currentLang=="fr"){
      this.showAlert("Il n'y a pas de liste chargée pour votre demande");
      }
      }
    });
      break;
    }



  }

  SetListaMateria(Materia:string,Aula:string)
  {
    
    var Observable = this.list.snapshotChanges(['child_added'])
    .subscribe(actions => { 
    actions.forEach(action => {
      if(action.payload.val()["Materia"]==Materia )
      {
        if(  action.payload.val()["Aula"]==+Aula)
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
    if(this.translate.currentLang=="es"){
    this.showAlert("No hay lista cargada para su consulta")    ;       }
if(this.translate.currentLang=="ja"){
this.showAlert("あなたのお問い合わせのためのロードされたリストはありません") ; }
if(this.translate.currentLang=="it"){
this.showAlert("Non esiste una lista caricata per la tua richiesta");  }
if(this.translate.currentLang=="po"){
this.showAlert("Não há lista carregada para sua consulta") ;}
if(this.translate.currentLang=="en"){
this.showAlert("There is no loaded list for your inquiry");  }
if(this.translate.currentLang=="fr"){
this.showAlert("Il n'y a pas de liste chargée pour votre demande");
}
 
  }
  });
  }
  showAlert(mensaje:string) {
    
    let alert = this.alertCtrl.create({
   
      subTitle: mensaje,
      
      
        buttons: ['OK']
    });
    alert.present();
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