import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the ExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-excel',
  templateUrl: 'excel.html',
})
export class ExcelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcelPage');
  }

}
