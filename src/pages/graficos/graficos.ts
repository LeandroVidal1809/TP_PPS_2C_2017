import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { LoginPage } from '../login/login';
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
  
  constructor(public navCtrl: NavController,    public db: AngularFireDatabase, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
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
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

}
