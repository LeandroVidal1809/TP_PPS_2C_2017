import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class QRPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
  
  }
  closeModal(){
    const myData ={
      name: 'Leandro',
      ocupacion: 'saliendo'
    };

    this.view.dismiss(myData);
  }
 ionViewWillLoad(){
const data = this.navParams.get('data');
console.log(data);
 }
  
}
