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

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

perfil = {
  loggedin: false,name : '',
profilePicture: '',
email: ''
}



  seccionA = false;
  seccionB = true;
  classactivo = "";
  claseRegistrar:string;
  claseLogin:string;

  username:string;
  password:string;
  tipoUser:string;
  Mensaje:string;
  passwordconfirm:string;

  constructor(public menuCtrl: MenuController,
              public spiner:LoadingController,
              public navCtrl: NavController,
              public facebook: Facebook,
              public platform: Platform,
              public alertCtrl: AlertController,
              private _auth:AngularFireAuth,
              public navParams: NavParams) 
  {
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
                        .then(result => { espera.dismiss();
                                          this.navCtrl.setRoot(HomePage,{usuario:this.username})})
                        .catch(error =>{ espera.dismiss();
                                        this.showAlert(error.message,"Error al ingresar!")})

                        

                      
                    }
  }

  async Aceptar()
  {
    
    if(this.password.length>5){
    if(this.password==this.passwordconfirm)
    try{
         this.MiSpiner();
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
        this.perfil.email = res.user.email;
        this.perfil.loggedin = true;
        this.perfil.profilePicture = res.user.photoURL;
        this.perfil.name = res.user.displayName;
        this.navCtrl.setRoot(HomePage,this.perfil);
    
        
    
    
      });
    
      
    })

}else{

  this._auth.auth.signInWithPopup(signin).then(res =>{
    console.log("INGRESANDO CON ---",provider,"---");
    console.log(res);
    this.perfil.email = res.user.email;
    this.perfil.loggedin = true;
    this.perfil.profilePicture = res.user.photoURL;
    this.perfil.name = res.user.displayName;
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

 
 
  
  CargarADM(){    this.username = "admin@admin.com";
  this.password = "admin123";}

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
