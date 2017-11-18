import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import * as papa from 'papaparse';
//import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
 import {AngularFireDatabase} from 'angularfire2/database';
 import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from  '@ionic-native/file-transfer';
 
 import { LoginPage } from '../login/login';
//import { FirebaseListObservable ,AngularFireDatabase } from "angularfire2/database-deprecated";

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

  aulaSelect:string;
  materiaSelect:string;
  testRadioOpen: boolean;
  testRadioResult;
  archivo: string;
  public csvData: any[] = [];
  lista: any;
  miArray : any[] = [];
  //lista: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: Http,
             // private fileTransfer: FileTransfer, 
             // private file: File,
              public af: AngularFireDatabase,
              public alertCtrl: AlertController,
               private view: ViewController,
               private _auth:AngularFireAuth) {
                this.lista= af.list('/Alumno/');
  }
  closeModal(){
    this.view.dismiss();
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExcelPage');
  }

  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
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
    this.csvData = parsedData;
    console.log('respuesta ',  this.csvData);
  }


  public guardarLista()
  {

    
    for (var index = 0; index < this.csvData.length-1; index++) {
         var element = this.csvData[index];
          var element2 = element[0];
          this.lista.push({
            Legajo: element[0],
            Nombre : element[1],
            Aula: this.aulaSelect,
            Materia: this.materiaSelect,
            Horario:  element[2]
            });  
        }
        alert("Lista Importada Exitosamente!");
  }


  AlertMensaje(titulo: string, mens: string)
  {
    
      let ventana = this.alertCtrl.create({
      title: titulo,
      message: mens,
      buttons:[
        {
          text: "Aceptar",
          handler: data => {
            console.log('Mensaje de Alerta');
            }
          }
        ]

      });
      ventana.present(ventana);
  }
  

  
  

}
