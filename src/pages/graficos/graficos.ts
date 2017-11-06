import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  public doughnutChartLabels:string[] = ['Si', 'No', 'No Me Interesa'];
  public doughnutChartData:number[] = [350, 450, 100];

  public doughnutChartType:string = 'doughnut';
  
  public chartClicked(e:any):void {
    console.log(e);
    
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

}
