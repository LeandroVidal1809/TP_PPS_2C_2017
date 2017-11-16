import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	



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
  email:string;
  password:string;
  passwordconfirm:string;
  nombre: string;
  tipo:string;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.tienePermisos();
                  this.lista= af.list('/Usuarios/');
  }

  tienePermisos()
  {
    if(sessionStorage.getItem("type")!="admin")
      {
          this.showAlert("No tiene permisos para ingresar al ABM de Profesores y Administrativos","Lo sentimos");
          this.navCtrl.setRoot(HomePage);
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
    var ok =this.Registrar();
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


Registrar():Boolean
{
  if(this.password.length>5){
    if(this.password==this.passwordconfirm)
    try{
         this.MiSpiner();
        const result =  this._auth.auth.createUserWithEmailAndPassword(this.email,this.password);
    
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
    
}
  

