import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	



import { LoginPage } from '../login/login';
import { swipeShouldReset } from 'ionic-angular/util/util';
/**
 * Generated class for the AbmProfyAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar',
  templateUrl: 'modificar.html',
})
export class Modificar {

  lista: any;
  legajo: string;
  Mensaje:string;
  email:string;
  password:string;
  passwordconfirm:string;
  nombre: string;
  tipo:string;
  perfil = {name : '',profilePicture: '',email: ''};
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
                private view: ViewController,
                private _auth:AngularFireAuth) {
               //  this.tienePermisos();
                  this.lista= af.list('/Usuarios/');
                  console.log(navParams);
                  this.perfil=navParams.data;
                  console.log("prueba perfil logeado:",this.perfil);
                  this.email = this.perfil.email;
                  this.nombre = this.perfil.name;
                
  }
cargardatos(){
  var Observable = this.lista.snapshotChanges(['child_added'])
  .subscribe(actions => {
  actions.forEach(action => {

   
    action.payload.val()["Email"];
    action.payload.val()["Nombre"];
    action.payload.val()["Tipo"];
    
   

  }); 

  
})

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
    console.log('ionViewDidLoad modificar');
    const data = this.navParams.get('data');
    console.log("enviado desde home:",data);
    this.email = data.email;
    this.nombre = data.name;
    this.tipo = data.tipo;
  }

Guardar2(){
console.log("modificado:",this.email,this.nombre);
const data ={
  name:this.nombre,
  email: this.email,
  tipo: this.tipo
};

this.view.dismiss(data);

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
      let espera = this.MiSpiner();
      espera.present();    
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

      fotoelegida(valor:string)
      {
        switch (valor) {
            case '1':
            
            break;
            case '2':
            
            break;
            case '3':
            
            break;
            case '4':
            
            break;
            case '5':
            
            break;
        
          default:
            break;
        }
      }
     
    
}
  

