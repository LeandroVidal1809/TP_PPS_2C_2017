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

  signInWithFacebook() {

   // if (this.platform.is('cordova')) {
   //   this.facebook.login(['email', 'public_profile']).then(res => {
    //    this._auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res =>{
   //       console.log(res);
   //       this.navCtrl.setRoot(HomePage);
   //     }).catch(error => {
   //       console.log(error);
   //       alert("Secundario: "+error);
   //     });
   //   }).catch(error => {
  //      alert("Principal: "+error);
  //    });
 //   } else{//esto es para localhost
      this._auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res =>{
        console.log("---FACEBOOK---");
        console.log(res);
        this.perfil.email = res.user.email;
        this.perfil.loggedin = true;
        this.perfil.profilePicture = res.user.photoURL;
        this.perfil.name = res.user.displayName;
        this.navCtrl.setRoot(HomePage,this.perfil);
      })

      
   // }

     }
     signInWithGoogle(){

      this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>{
        console.log("---GOOGLE---");
        console.log(res);
        this.perfil.email = res.user.email;
        this.perfil.loggedin = true;
        this.perfil.profilePicture = res.user.photoURL;
        this.perfil.name = res.user.displayName;
        this.navCtrl.setRoot(HomePage,this.perfil);
              })
        

     }
     signInWithGitHub(){

      this._auth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(res=>{
        console.log("---GITHUB---");
        console.log(res);
        this.perfil.email = res.user.email;
        this.perfil.loggedin = true;
        this.perfil.profilePicture = res.user.photoURL;
        this.perfil.name = res.user.displayName;
        this.navCtrl.setRoot(HomePage, this.perfil);
      })

     }

Loguot(){

  this._auth.auth.signOut();

}
  
  //intento fallido
   signInWithFacebook2() {
 let provider = new firebase.auth.FacebookAuthProvider();
 firebase.auth().signInWithRedirect(provider).then(()=>{
   firebase.auth().getRedirectResult().then((result)=>{
     alert(JSON.stringify(result));
   }).catch(function(error){
     alert(JSON.stringify(error))
   });
 })



  }

  signInWithFacebookPABLO() {
    if (this.platform.is('cordova')) {
      this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then(() => {
          this.navCtrl.push(HomePage); 
          console.log(facebookCredential);         
        }).catch(error => {
          console.log(error);
          alert("Secundario: "+error);
        });
      }).catch(error => {
        alert("Principal: "+error);
      });
    } else {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res) => {
        let loader = this.spiner.create({
          content: "Espere...",
          duration: 2600
        });
        loader.present();
        this.navCtrl.push(HomePage);
      }).catch(error => {
        console.log(error);
      });
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
