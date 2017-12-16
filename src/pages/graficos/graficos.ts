import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController ,LoadingController, Loading} from 'ionic-angular';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

/**
 * Generated class for the GraficosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {
  //respuesta1
  voto1:number = 0;
  voto2:number = 0;
  voto3:number = 0;

  resp1;
  resp2;
  resp3;

  list: AngularFireList<any>;
  miLista:Array<any>;
pregunta;


  public doughnutChartLabels:string[] = ['Si', 'No'];
  public doughnutChartData:number[]= [this.voto1, this.voto2];
  public doughnutChartType:string = 'doughnut';
  public chartClicked(e:any):void {
    console.log(e);
    
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  constructor(public translate: TranslateService,public navCtrl: NavController,   public spiner:LoadingController,  public alertCtrl: AlertController,   public db: AngularFireDatabase, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log('Language changed to ' + this.translate.currentLang);
      });
     // this.tienePermisos();
      let espera = this.MiSpiner2();
      espera.present();   
      this.cargarRespuestas();
      
      this.cargarresultados();
      
      
      
      
    
  }

  cargarRespuestas(){
    this.list=this.db.list('/altaEncuesta');
    
          var Observable = this.list.snapshotChanges(['child_added'])
          .subscribe(actions => {
          actions.forEach(action => {
              this.resp1 =  action.payload.val()["Respuesta1"];
              this.resp2 =  action.payload.val()["Respuesta2"];
              this.resp3 =  action.payload.val()["Respuesta3"];
              console.log(this.resp1,this.resp2,this.resp3);
    
              this.doughnutChartLabels = [this.resp1,  this.resp2,  this.resp3 ];
         
           

          }); 

          
        })

  }
  MiSpiner2():Loading
  {if(this.translate.currentLang=="es"){
    let loader = this.spiner.create({content:"Espere..", duration: 3000});               return loader;                  }
if(this.translate.currentLang=="ja"){
  let loader = this.spiner.create({content:"待つ..", duration: 3000});    return loader;   }
if(this.translate.currentLang=="it"){
  let loader = this.spiner.create({content:"aspettare..", duration: 3000});     return loader;   }
if(this.translate.currentLang=="po"){
  let loader = this.spiner.create({content:"Espere..", duration: 3000});    return loader; }
if(this.translate.currentLang=="en"){
  let loader = this.spiner.create({content:"waited..", duration: 3000});    return loader;   }
if(this.translate.currentLang=="fr"){
  let loader = this.spiner.create({content:"Attendre..", duration: 3000});   return loader;
}
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
  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
  cargarresultados(){

    
    this.list=this.db.list('/encuesta');
    var Observable = this.list.snapshotChanges(['child_added'])
    .subscribe(actions => {
    actions.forEach(action => {
      this.pregunta = action.payload.val()["Pregunta"];
     


        if(action.payload.val()["select"]==this.resp1)
        {this.voto1++;}
        if(action.payload.val()["select"]==this.resp2)
        {this.voto2++;}
        if(action.payload.val()["select"]==this.resp3)
        {this.voto3++;}
        
    

     
    });  this.doughnutChartData = [this.voto1, this.voto2, this.voto3];
  })       
  }
 
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  closeModal(){
    const 
      voto = true;
   
    
    this.view.dismiss(voto);
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

}
