import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

perfil = {
  name : '',
profilePicture: '',
email: ''
}



  seccionA = false;
  seccionB = true;
  classactivo = "";
  claseRegistrar:string;
  claseLogin:string;
type:string;
  username:string;
  nombre:string;
  password:string;
  tipoUser:string;
  Mensaje:string;
  nameUser:string;
  passwordconfirm:string;
  list: AngularFireList<any>;
  constructor(public menuCtrl: MenuController,
              public spiner:LoadingController,
              public navCtrl: NavController,
              public facebook: Facebook,
              public platform: Platform,
              public alertCtrl: AlertController,
              public af: AngularFireDatabase,
              private _auth:AngularFireAuth,
              public navParams: NavParams) 
  { 
 
    this.list= af.list('/Usuarios');
    this.claseLogin="active";
    this.claseRegistrar="";
  }


  async login()
  {
    if(this.username==null||this.password==null||this.password==''||this.username=='')
      {
        this.showAlert("Debe completar el Email y su Clave para ingresar","Campo vacio!");
      }
      else{
        let espera = this.MiSpiner();
        espera.present();       
        await this._auth.auth.signInWithEmailAndPassword(this.username,this.password)
                        .then(result => { 
                          espera.dismiss();
                          var Observable = this.list.snapshotChanges(['child_added'])
                          .subscribe(actions => {
                            actions.forEach(action => {
                          
                              if(action.payload.val()["Email"]==this.username)
                            {
                              
                            this.type= action.payload.val()["Tipo"];
                            }
                          });
                          sessionStorage.setItem("type",this.type);
                          console.log("tipo: "+ this.type);
                          
                          if(sessionStorage.getItem("type")=="admin") {
                            this.perfil.name =sessionStorage.getItem("type");
                            this.perfil.profilePicture =  '../assets/imgs/admin.jpg';
                            this.perfil.email = "administrador@administrador.com";
                          }
                          else if(sessionStorage.getItem("type")=="profesor")  {
                            this.perfil.name =sessionStorage.getItem("type");
                            this.perfil.profilePicture =  '../assets/imgs/profesor.jpg';
                            this.perfil.email = "profesor@profesor.com";
                          }
                       
                          else if(sessionStorage.getItem("type")=="administrativo")  {
                            this.perfil.name =sessionStorage.getItem("type");
                            this.perfil.profilePicture =  '../assets/imgs/administrativo.jpg';
                            this.perfil.email = "administrativo@administrativo.com";
                          }
                          else{
                            this.perfil.name = "federico";
                            this.perfil.profilePicture =  '../assets/imgs/alumno.jpg';
                            this.perfil.email = this.username;
                            this.type= "alumno";
                          }
                                          this.navCtrl.setRoot(HomePage,this.perfil)
                         });                     
                        })
                        .catch(error =>{ espera.dismiss();
                                        this.showAlert(error.message,"Error al ingresar!")})     
                    }
  }

  async Aceptar()
  {
    
    if(this.password.length>5){
    if(this.password==this.passwordconfirm)
    try{
      
        const result = await this._auth.auth.createUserWithEmailAndPassword(this.username,this.password);
   
        this.Mensaje=this.username + " Fue ingresado Exitosamente!"
        //alert(this.Mensaje);
        let alert = this.alertCtrl.create({
          title: "Mensaje",
          subTitle: this.Mensaje,
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(LoginPage);
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

  }


  loginwith(provider){
let signin = null;
switch (provider) {
  case "facebook":
    signin =new firebase.auth.FacebookAuthProvider();
    
    break;
  case "google":
     signin =new firebase.auth.GoogleAuthProvider();
      
    break;
  case "github":
      signin =new firebase.auth.GithubAuthProvider();
        
    break;
    case "twitter":
    signin =new firebase.auth.TwitterAuthProvider();
      
  break;
}
if (this.platform.is('cordova')) {
  this._auth.auth.signInWithRedirect(signin).then(res =>{
    
      this._auth.auth.getRedirectResult().then(res =>{
    
        console.log("INGRESANDO CON ---",provider,"---");
        console.log(res);
        this.type= "alumno";
        sessionStorage.setItem("type",this.type);
        console.log("tipo: "+ this.type);
        this.perfil.email = res.user.email;
       
        this.perfil.profilePicture = res.user.photoURL;
        this.perfil.name = res.user.displayName;
        this.navCtrl.setRoot(HomePage,this.perfil);
    
        
    
    
      });
    
      
    })

}else{

  this._auth.auth.signInWithPopup(signin).then(res =>{
    console.log("INGRESANDO CON ---",provider,"---");
    console.log(res);
    this.type= "alumno";
    sessionStorage.setItem("type",this.type);
    console.log("tipo: "+ this.type);
    this.perfil.email = res.user.email;

    this.perfil.profilePicture = res.user.photoURL;
    this.perfil.name = res.user.displayName;
    let espera = this.MiSpiner2();
    espera.present();   
    this.navCtrl.setRoot(HomePage,this.perfil);
  })
}


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

  showAlert(mensaje:string,titulo:string) {
    
    switch(mensaje)
    {
      
      case "The email address is badly formatted.":
      {

        mensaje="El email no contiene un formato correcto";
        break;
      }
      case "The password is invalid or the user does not have a password.":
      {
        mensaje="La clave es incorrecta, intente nuevamente";
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
   // loader.present();
    return loader;
  }
  MiSpiner2():Loading
  {
    let loader = this.spiner.create({
      content:"Espere..",
      duration: 2000
      
    });
   // loader.present();
    return loader;
  }
 
 
  
  CargarADM(type:string){  
  
    switch(type)
    {
      case 'Administrador':
      this.username = "administrador@administrador.com";
      this.password = "admin123";
      break;
      case 'Administrativo':
      this.username = "administrativo@administrativo.com";
      this.password = "admin123";
      break;
      case 'Profesor':
      this.username = "profesor@profesor.com";
      this.password = "admin123";
      break;
      case 'Alumno':
      this.username = "alumno@alumno.com";
      this.password = "admin123";

      
    }

  }

  ionViewDidLeave(){
    this.menuCtrl.enable(true);
  }

  redirect(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
    
  }

  mortrarA(boton){
    console.log(this.seccionA);
    if (boton == "A"){
      this.seccionA = false;
      this.seccionB = true;
      this.claseLogin="active";
      this.claseRegistrar="";
    }
    else{
      this.seccionA = true;
      this.seccionB = false;
      this.claseLogin="";
      this.claseRegistrar="active";
    }
  }

  ABMAlumnos(){
    this.navCtrl.setRoot(HomePage);  
  }
}
