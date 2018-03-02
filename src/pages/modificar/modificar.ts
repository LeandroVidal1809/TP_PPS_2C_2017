import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { HomePage } from '../home/home';	

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


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
  Mensaje:string;
  email:string;
  password:string;
  passwordconfirm:string;
  nombre: string;
  tipo:string;
  foto: string;
  KeyUsuario:string;
  listadoU:Array<any>;
  perfil = {name : '',profilePicture: '',email: '',tipo:''};
  
  constructor(public translate: TranslateService,public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl: AlertController,
               public af: AngularFireDatabase,
               public spiner:LoadingController,
                private view: ViewController,
                private _auth:AngularFireAuth) {
                  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  console.log('Language changed to ' + this.translate.currentLang);
                });
               //  this.tienePermisos();
                  this.lista= af.list('/Usuarios/');
                  console.log(navParams);
                  this.perfil=navParams.data;
                  console.log("prueba perfil logeado:",this.perfil);
                  this.email = this.perfil.email;
                  this.nombre = this.perfil.name;
                  this.foto = this.perfil.profilePicture
                  this.tipo =this.perfil.tipo;
                  this.listadoU=new Array<any>();

                  var Observable = this.lista.snapshotChanges(['child_added'])
                  .subscribe(actions => {
                    actions.forEach(action => {

                      if(action.payload.val()["Email"] == this.email)
                      {

            
                        this.KeyUsuario = action.key;
                      }
                  });
              })

                
  }

  tienePermisos()
  {
    if(sessionStorage.getItem("type")!="admin" && sessionStorage.getItem("type")!="administrativo")
      {
          
          if(this.translate.currentLang=="es"){
            this.showAlert("No tiene permisos para ingresar como Profesores y Administrativos","Lo sentimos");                  }
      if(this.translate.currentLang=="ja"){
        this.showAlert("教授と管理者のABMに入る権限がありません。","ごめんなさい");   }
      if(this.translate.currentLang=="it"){
        this.showAlert("Non hai il permesso di entrare nell'ABM di professori e amministratori","Siamo spiacenti");   }
      if(this.translate.currentLang=="po"){
        this.showAlert("Você não tem permissão para entrar na ABM de Professores e Administradores","Sentimos muito"); }
      if(this.translate.currentLang=="en"){
        this.showAlert("You do not have permission to enter the ABM of Professors and Administrators","We are sorry");   }
      if(this.translate.currentLang=="fr"){
        this.showAlert("Vous n'êtes pas autorisé à entrer dans le guichet automatique des professeurs et des administrateurs","Nous sommes désolés");
      }
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

Guardar2(foto: string){


 
  if(this.nombre != "" || this.foto != "")
  {

        this.lista.update(this.KeyUsuario,
          { 
            Nombre: this.nombre,
            Foto:this.foto
         })
    
         if(this.translate.currentLang=="es"){
          this.showAlert("Se guardo correctamente el alumno","Exito");                  }
    if(this.translate.currentLang=="ja"){
      this.showAlert("生徒は正しく保存されました","成功");   }
    if(this.translate.currentLang=="it"){
      this.showAlert("Lo studente è stato correttamente salvato","Súkses");   }
    if(this.translate.currentLang=="po"){
      this.showAlert("O aluno foi salvo corretamente","Sucesso"); }
    if(this.translate.currentLang=="en"){
      this.showAlert("The student was correctly saved","Success");   }
    if(this.translate.currentLang=="fr"){
      this.showAlert("L'étudiant a été correctement enregistré","Succès");
    }


  }
  else
  {

    if(this.translate.currentLang=="es"){
      this.showAlert("Complete todos los campos","Lo Sentimos");                  }
if(this.translate.currentLang=="ja"){
  this.showAlert("生徒は正しく保存されました","成功");   }
if(this.translate.currentLang=="it"){
  this.showAlert("Completa tutti i campi","Siamo spiacenti");   }
if(this.translate.currentLang=="po"){
  this.showAlert("Complete todos os campos","Sentimos muito"); }
if(this.translate.currentLang=="en"){
  this.showAlert("Complete all fields","We are sorry");   }
if(this.translate.currentLang=="fr"){
  this.showAlert("Complétez tous les champs","Nous sommes désolés");
}

  }

}
  

// Registrar():Boolean
// {
//   if(this.password.length>5){
//     if(this.password==this.passwordconfirm)
//     try{
//       let espera = this.MiSpiner();
//       espera.present();    
//         const result =  this._auth.auth.createUserWithEmailAndPassword(this.email,this.password);
  
//       this.showAlert(this.email + " Fue ingresado Exitosamente!","Proceso finalizado");      
//     return true;  
//     }
//       catch(e)
//       {
     
//         console.error(e);
//         this.showAlertRegistrar(e,"error al registrarse");
//       }
//     else
//       {this.showAlertRegistrar("las claves no coinciden , intente nuevamente","error al registrarse")}
//   }
//   else
//     {

//       this.showAlertRegistrar("la clave debe contener por lo menos 6 caracteres","error al registrarse")
//     }
// return false;
//   }

//   showAlertRegistrar(mensaje:string,titulo:string) {
    
//         switch(mensaje)
//         {
          
//           case "The email address is badly formatted.":
//           {
    
//             mensaje="El email no contiene un formato correcto";
//             break;
//           }
         
    
//         }
//         let alert = this.alertCtrl.create({
//           title: titulo,
//           subTitle: mensaje,
//           buttons: ['OK']
//         });
//         alert.present();
//       }  


      MiSpiner():Loading
      {
        let loader = this.spiner.create({
          content:"Espere..",
          duration: 25000
          
        });
        return loader;
      }


     
    
}
  

