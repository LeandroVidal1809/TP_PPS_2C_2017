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
  votop1 = 0;//si
  votop2 = 0;//no

  
  votos1 = 0;//buena
  votos2 = 0;//mala

  
  voton1 = 0;
  voton2 = 0;  
  voton3 = 0;
  voton4 = 0;
  voton5 = 0;
  list: AngularFireList<any>;
  miLista:Array<any>;

  public doughnutChartLabels:string[] = ['Si', 'No'];
  public doughnutChartLabels2:string[] = ['Buena', 'Mala'];
  public doughnutChartLabels3:string[] = ['1', '2', '3', '4', '5'];
  public doughnutChartData:number[] ;// [this.votop1, this.votop2];
  public doughnutChartData2:number[] ; //[this.votos1, this.votos2];
  public doughnutChartData3:number[];  //[this.voton1, this.voton2, this.voton3,this.voton4,this.voton5];

  public doughnutChartType:string = 'doughnut';
 
  
  public chartClicked(e:any):void {
    console.log(e);
    
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  constructor(public navCtrl: NavController,    public db: AngularFireDatabase, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
      this.list=db.list('/encuesta');

  }

  cargargrafico(){
   
    var Observable = this.list.snapshotChanges(['child_added'])
    .subscribe(actions => {
    actions.forEach(action => {
      if(action.payload.val()["respuesta1"]=="No")
      {
       console.log(action.payload.val());
       this.miLista.push(action.payload.val());
       var listString = JSON.stringify(this.miLista);
      //   if(listString!=null)
   //    sessionStorage.setItem("lista",listString);
       
      }
    }); 
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
