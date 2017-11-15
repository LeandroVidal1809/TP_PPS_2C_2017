import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';

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
  votoS1 = 1;
  votoN1 =2;
  votoNI1= 3;
  
  votoS2 = 3;
  votoN2 = 2;
  votoNI2= 1;
  
  votoS3 = 2;
  votoN3 = 2;
  votoNI3= 2;
  


  
  public doughnutChartLabels:string[] = ['Si', 'No', 'No Me Interesa'];
  public doughnutChartData:number[] = [this.votoS1, this.votoN1, this.votoNI1];
  public doughnutChartData2:number[] = [this.votoS2, this.votoN2, this.votoNI2];
  public doughnutChartData3:number[] = [this.votoS3, this.votoN3, this.votoNI3];
  public doughnutChartType:string = 'doughnut';
  
  
  public chartClicked(e:any):void {
    console.log(e);
    
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
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
