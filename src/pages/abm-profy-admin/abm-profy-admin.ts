import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	
import * as papa from 'papaparse';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';
/**
 * Generated class for the AbmProfyAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abm-profy-admin',
  templateUrl: 'abm-profy-admin.html',
})
export class AbmProfyAdminPage {

  lista: any;
  legajo: string;
  Mensaje:string;
  tipo:string;
  email:string;
  password:string;
  passwordconfirm:string;
  public csvData: any[] = [];
  nombre: string;
  tipocarga:string;
  lista1:boolean;
  testRadioOpen: boolean;
  testRadioResult;
  archivo: string;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
               private http: Http,
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.tienePermisos();
                  this.lista= af.list('/Usuarios/');
                  this.lista1=true;
                  
  }

  tienePermisos()
  {
    if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
      {
          this.showAlert("No tiene permisos para ingresar al ABM de Profesores y Administrativos","Lo sentimos");
          this.view.dismiss(); // this.navCtrl.setRoot(HomePage);    
      }
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    this.view.dismiss();
      }
      showAlert(mensaje:string,titulo:string) {
        
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensaje,
          buttons: ['OK']
        });
        alert.present();
      }
      
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmProfyAdminPage');
  }


  Guardar()
  {
    var ok =this.Registrar('');
    if(ok)
      {
    this.lista.push({
      Nombre : this.nombre,
      Email:this.email,
      Tipo: this.tipo.toLowerCase()

      });  
    
      this.legajo = "";
      this.nombre = "";
      this.tipo = "";
      this.email = "";
      this.password="";
      this.passwordconfirm="";
    }
    this.showAlert("Se guardo el usuario correctamente","Proceso finalizado");
  }



  GuardarLista()
  {
    debugger;
    let espera = this.MiSpiner();
    espera.present();  
    for (var index = 0; index < this.csvData.length-1; index++) {
      var element = this.csvData[index];
        var _legajo = element[0];
        var _nombre = element[1];
        var _email = element[2];
        var _clave = element[3];
        var _foto = element[4];
        this.email=_email;
        this.password= _clave;
        this.passwordconfirm= _clave;
        var _tipo=this.archivo.split("-");
        var ok =this.Registrar('lista');
        if(ok)
          {
        this.lista.push({
          Legajo:_legajo,
          Nombre : _nombre,
          Email:_email,
          Tipo: _tipo[0],
          Foto: _foto
    
          });  

      }
    }
    espera.dismiss();
    this.showAlert("Se guardo la lista correctamente","Proceso finalizado");
  }





Registrar(tipo:string):Boolean
{
  if(this.password.length>5){
    if(this.password==this.passwordconfirm)
    try{
      if(tipo!='lista'){
      let espera = this.MiSpiner();
      espera.present(); 
    }   
        const result =  this._auth.auth.createUserWithEmailAndPassword(this.email,this.password);
    
        if(tipo!='lista')
      this.showAlert(this.email + " Fue ingresado Exitosamente!","Proceso finalizado");      
    return true;  
    }
      catch(e)
      {
     
        console.error(e);
        this.showAlertRegistrar(e,"error al registrarse");
      }
    else
      {this.showAlertRegistrar("las claves no coinciden , intente nuevamente","error al registrarse")}
  }
  else
    {

      this.showAlertRegistrar("la clave debe contener por lo menos 6 caracteres","error al registrarse")
    }
return false;
  }

  showAlertRegistrar(mensaje:string,titulo:string) {
    
        switch(mensaje)
        {
          
          case "The email address is badly formatted.":
          {
    
            mensaje="El email no contiene un formato correcto";
            break;
          }
         
    
        }
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensaje,
          buttons: ['OK']
        });
        alert.present();
      }  


      MiSpiner():Loading
      {
        let loader = this.spiner.create({
          content:"Espere..",
          duration: 25000
          
        });
        return loader;
      }
     
    

      public elegirArchivos()
      {
        let alert = this.alertCtrl.create();
        alert.setTitle('Elegir archivo');
      
        alert.addInput({
          type: 'radio',
          label: 'Profesor-Carga',
          value: 'Profesor-Carga',
          checked: true
        });
      
      
        alert.addButton('Cancel');
        alert.addButton({
          text: 'Ok',
          handler: data => {
            console.log('Radio data:', data);
            this.testRadioOpen = false;
            this.testRadioResult = data;
      
            if(data){
              switch (data) {
                case 'Profesor-Carga':
                 this.archivo ='Profesor-Carga.csv';
                 this.readCsvData();
                  break;
                
                
              }
            }
      
          }
        });
      
        alert.present().then(() => {
          this.testRadioOpen = true;
        });
      }
    
    
      private readCsvData() {
        if(this.archivo != null){
        this.http.get('assets/archivos/'+this.archivo)
          .subscribe(
          data => this.extractData(data),
          err => this.handleError(err)
          );
        }   
      }
    
      private handleError(err) {
        console.log('Error ', err);
      }
     
    
      private extractData(res) {
    
        let csvData = res['_body'] || '';
        let parsedData = papa.parse(csvData).data;
        this.csvData = parsedData;
        console.log('respuesta ',  this.csvData);
      }

      cambiaLista(tipocargaa:string)
      {
          if(tipocargaa=="uno")
            {
              this.lista1=true;
            }
            else
              this.lista1=false;
      }
}
  

