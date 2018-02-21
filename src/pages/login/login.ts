import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { MenuController } from 'ionic-angular';
import { AbmAlumnosPage } from '../abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../abm-profy-admin/abm-profy-admin';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import * as firebase from 'firebase';
//import { Facebook } from '@ionic-native/facebook';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { Geolocation } from '@ionic-native/geolocation';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  langs = ['en', 'fr', 'es','po','ja','it'];
perfil = {
  name : '',
profilePicture: '',
email: '',
tipo:''
}



  seccionA = false;
  seccionB = true;
  classactivo = "";
  claseRegistrar:string;
  claseLogin:string;
  type:string;
  foto:string;
  username:string;
  nombre:string;
  password:string;
  tipoUser:string;
  Mensaje:string;
  nameUser:string;
  passwordconfirm:string;
  list: AngularFireList<any>;
  mail:string;
  constructor(public menuCtrl: MenuController,
              public spiner:LoadingController,
              public navCtrl: NavController,
         //     public facebook: Facebook,
         private gps: Geolocation,
              public platform: Platform,
              public alertCtrl: AlertController,
              public af: AngularFireDatabase,
              private _auth:AngularFireAuth,
              public navParams: NavParams, public translate: TranslateService) 
  { 
    this.platform.ready().then(() => {

this.gps.getCurrentPosition().then(resp =>{
 /* 
  alert(resp.coords.latitude);
  alert(resp.coords.longitude); */
  if(resp.coords.latitude> 13.83 && resp.coords.latitude< 53.48 && resp.coords.longitude<153.98 && resp.coords.longitude>50.44){
  //  alert("Jampong");
    this.translate.use('ja');
  }
  else if(resp.coords.latitude> 35.96 && resp.coords.latitude< 46.25 && resp.coords.longitude<18.45 && resp.coords.longitude>6.85){
  // alert("Con los Italianos");
    this.translate.use('it');
  }
  else if(resp.coords.latitude> -17.85 && resp.coords.latitude< 12 && resp.coords.longitude<-32 && resp.coords.longitude>-83){
   //alert("Braziiiilia");
    this.translate.use('po');
  }
  else if(resp.coords.latitude>12.38 && resp.coords.latitude< 68.46 && resp.coords.longitude<-60.82 && resp.coords.longitude>-140.97){
  // alert("NewYorkCityy");
    this.translate.use('en');
  }
  else if(resp.coords.latitude> 42.35 && resp.coords.latitude< 51.01 && resp.coords.longitude<7.55 && resp.coords.longitude>-7.55){
 //alert("Estamos en Europa");
    this.translate.use('fr');
  }
  else if(resp.coords.latitude> -54.87 && resp.coords.latitude< -18.45 && resp.coords.longitude<-53.78 && resp.coords.longitude>-80.15){
   // alert("Latinoamerica muchachos");
    this.translate.use('es');
  }else{
    this.translate.use('en');

  }
}).catch(error =>{ 
  
if(this.translate.currentLang=="es"){
  this.showAlert("Localización no encontrada","Error");
}
if(this.translate.currentLang=="ja"){
  this.showAlert("場所が見つかりません","エラー");
}
if(this.translate.currentLang=="it"){
  this.showAlert("Posizione non trovata","Errore");
}
if(this.translate.currentLang=="po"){
  this.showAlert("Localização não encontrada","Erro");
}
if(this.translate.currentLang=="en"){
  this.showAlert("Location not found","Error");
}
if(this.translate.currentLang=="fr"){
  this.showAlert("Emplacement non trouvé","Erreur");
}

}) 
  


    });


    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed to ' + this.translate.currentLang);
    });
    this.list= af.list('/Usuarios');
    this.claseLogin="active";
    this.claseRegistrar="";
  }


  async login()
  {
    if(this.username==null||this.password==null||this.password==''||this.username=='')
      {
        
        if(this.translate.currentLang=="es"){
          this.showAlert("Debe completar el Email y su Clave para ingresar","Campo vacio!");
        }
        if(this.translate.currentLang=="ja"){
          this.showAlert("入力するには、電子メールとパスワードを入力する必要があります","空のフィールド!");        }
        if(this.translate.currentLang=="it"){
          this.showAlert("È necessario completare l'e-mail e la password per entrare","Campo vuoto!");        }
        if(this.translate.currentLang=="po"){
          this.showAlert("Você deve preencher o e-mail e sua senha para entrar","Campo vazio!");        }
        if(this.translate.currentLang=="en"){
          this.showAlert("You must complete the Email and your Password to enter","Empty field!");        }
        if(this.translate.currentLang=="fr"){
          this.showAlert("Vous devez compléter l'email et votre mot de passe pour entrer","Champ vide");
        }
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
                            this.foto= action.payload.val()["Foto"];
                            this.nombre= action.payload.val()["Nombre"];
                            this.mail = action.payload.val()["Email"];
      
                            }
                           // this.type= action.payload.val()["Tipo"];
                          
                          });

                          
                          sessionStorage.setItem("type",this.type);
                          sessionStorage.setItem("foto",this.foto);
                          sessionStorage.setItem("nombre",this.nombre);
                          console.log("tipo: "+ this.type);
                          console.log("foto: "+ this.foto);
                          
                          if(sessionStorage.getItem("type")=="admin") {
                            this.perfil.name =sessionStorage.getItem("nombre");
                            this.perfil.profilePicture =  this.foto;
                            this.perfil.email = this.mail;
                            this.perfil.tipo = this.type;
                          }
                          else if(sessionStorage.getItem("type")=="profesor")  {
                            this.perfil.name =sessionStorage.getItem("nombre");
                            this.perfil.profilePicture =  this.foto;
                            this.perfil.email = this.mail;
                            this.perfil.tipo = this.type;
                          }
                       
                          else if(sessionStorage.getItem("type")=="administrativo")  {
                            this.perfil.name =sessionStorage.getItem("nombre");
                            this.perfil.profilePicture =  this.foto;
                            this.perfil.email = this.mail;
                            this.perfil.tipo = this.type;
                          }
                          else{
                            this.perfil.name = sessionStorage.getItem("nombre");
                            this.perfil.profilePicture =  this.foto;
                            this.perfil.email = this.username;
                            this.type= "alumno";
                            this.perfil.tipo = this.type;
                          }                        
                                          this.navCtrl.setRoot(HomePage,this.perfil)
                         });                     
                        })
                        .catch(error =>{ espera.dismiss();
                                       
                                      
                                      
                                        if(this.translate.currentLang=="es"){
                                          this.showAlert(error.message,"Error al ingresar!")                                        }
                                        if(this.translate.currentLang=="ja"){
                                          this.showAlert(error.message,"入力時のエラー!")       }
                                        if(this.translate.currentLang=="it"){
                                          this.showAlert(error.message,"Errore durante l'immissione!")       }
                                        if(this.translate.currentLang=="po"){
                                          this.showAlert(error.message,"Erro ao entrar!")  }
                                        if(this.translate.currentLang=="en"){
                                          this.showAlert(error.message,"Error when enteringar!")      }
                                        if(this.translate.currentLang=="fr"){
                                          this.showAlert(error.message,"Erreur lors de la saisie!")
                                        }
                                      } )     
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
        this.type= "alumnos";
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
    this.type= "alumnos";
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
                                        if(this.translate.currentLang=="es"){
                                          mensaje="El email no contiene un formato correcto";
                                          break;                                     }
                                        if(this.translate.currentLang=="ja"){
                                          mensaje="電子メールに正しいフォーマットが含まれていません";
                                          break;    }
                                        if(this.translate.currentLang=="it"){
                                          mensaje="L'email non contiene un formato corretto";
                                          break;       }
                                        if(this.translate.currentLang=="po"){
                                          mensaje="O email não contém um formato correto";
                                          break;  }
                                        if(this.translate.currentLang=="en"){
                                          mensaje="The email does not contain a correct format";
                                          break;      }
                                        if(this.translate.currentLang=="fr"){
                                          mensaje="L'email ne contient pas un format correct";
                                          break;
                                        }
       
      }
      case "The password is invalid or the user does not have a password.":
      {
       
        if(this.translate.currentLang=="es"){
          mensaje="La clave es incorrecta, intente nuevamente";
          break;                                     }
        if(this.translate.currentLang=="ja"){
          mensaje="キーが間違っています。もう一度お試しください";
          break;    }
        if(this.translate.currentLang=="it"){
          mensaje="La chiave non è corretta, riprova";
          break;       }
        if(this.translate.currentLang=="po"){
          mensaje="A chave está incorreta, tente novamente";
          break;  }
        if(this.translate.currentLang=="en"){
          mensaje="The key is incorrect, try again";
          break;      }
        if(this.translate.currentLang=="fr"){
          mensaje="La clé est incorrecte, réessayez";
          break;
        }
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
    if(this.translate.currentLang=="es"){
      let loader = this.spiner.create({content:"Espere..", duration: 25000});               return loader;                  }
  if(this.translate.currentLang=="ja"){
    let loader = this.spiner.create({content:"待つ..", duration: 25000});    return loader;   }
  if(this.translate.currentLang=="it"){
    let loader = this.spiner.create({content:"aspettare..", duration: 25000});     return loader;   }
  if(this.translate.currentLang=="po"){
    let loader = this.spiner.create({content:"Espere..", duration: 25000});    return loader; }
  if(this.translate.currentLang=="en"){
    let loader = this.spiner.create({content:"waited..", duration: 25000});    return loader;   }
  if(this.translate.currentLang=="fr"){
    let loader = this.spiner.create({content:"Attendre..", duration: 25000});   return loader;
  }
 
   // loader.present();
 
  }
  MiSpiner2():Loading
  {  if(this.translate.currentLang=="es"){
    let loader = this.spiner.create({content:"Espere..", duration: 2000});               return loader;                  }
if(this.translate.currentLang=="ja"){
  let loader = this.spiner.create({content:"待つ..", duration: 2000});    return loader;   }
if(this.translate.currentLang=="it"){
  let loader = this.spiner.create({content:"aspettare..", duration: 2000});     return loader;   }
if(this.translate.currentLang=="po"){
  let loader = this.spiner.create({content:"Espere..", duration: 2000});    return loader; }
if(this.translate.currentLang=="en"){
  let loader = this.spiner.create({content:"waited..", duration: 2000});    return loader;   }
if(this.translate.currentLang=="fr"){
  let loader = this.spiner.create({content:"Attendre..", duration: 2000});   return loader;
}
    
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
   // this.menuCtrl.enable(true);
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
