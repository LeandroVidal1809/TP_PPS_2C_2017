import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import * as papa from 'papaparse';

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


  testRadioOpen: boolean;
  testRadioResult;
  archivo: string;
  public csvData: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: Http,
              public alertCtrl: AlertController,
               private view: ViewController) {
  }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcelPage');
  }



  public elegirArchivos()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Elegir archivo');
  
    alert.addInput({
      type: 'radio',
      label: 'PPS -4A-2c2017',
      value: 'PPS -4A-2c2017',
      checked: true
    });
  
    alert.addInput({
      type: 'radio',
      label: 'PPS-4b-2c2017',
      value: 'PPS-4b-2c2017'
    });
  
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
  
        if(data){
          switch (data) {
            case 'PPS -4A-2c2017':
             this.archivo ='PPS -4A-2c2017.csv';
             this.readCsvData();
              break;
            case 'PPS-4b-2c2017':
            this.archivo ='PPS-4b-2c2017.csv';
            this.readCsvData();
              break;
            
          }
        }
    
      }
    });
  
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }


  private readCsvData() {
    if(this.archivo != null){
    this.http.get('assets/archivos/'+this.archivo)
      .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
      );
    }   
  }

  private handleError(err) {

    console.log('Error ', err);
  }
 

  private extractData(res) {

    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
    console.log(parsedData);
    this.csvData = parsedData;
    console.log(csvData);
    console.log('respuesta ',  this.csvData);
  }

}
