import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import * as papa from 'papaparse';
 import {AngularFireDatabase} from 'angularfire2/database';
 import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
//  import { FileTransfer, FileUploadOptions, FileTransferObject } from 'npm install --save @ionic-native/file-transfer';
 
 import { LoginPage } from '../login/login';

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
  titulo:string;
  aulaSelect:string;
  materiaSelect:string;
  testRadioOpen: boolean;
  testRadioResult;
  archivo: string;
  public csvData: any[] = [];
  lista: any;
  Importacion: any;
  Tiempo: number;
  repetidor:any;
  Fecha:Date;
  existe:boolean;
  miArray : any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: Http,
              //private fileTransfer: FileTransfer, 
              private file: File,
              public af: AngularFireDatabase,
              public alertCtrl: AlertController,
               private view: ViewController,
               private _auth:AngularFireAuth) {
                this.lista= af.list('/Alumno/');
                this.Importacion= af.list('/Importaciones/');
                this.Fecha= new Date();
                this.Tiempo=0;
                this.existe=false;
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
      label: 'PPS-4A-2c2017-200',
      value: 'PPS-4A-2c2017-200',
      checked: true
    });
  
    alert.addInput({
      type: 'radio',
      label: 'PPS-4b-2c2017-201',
      value: 'PPS-4b-2c2017-201'
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
            case 'PPS-4A-2c2017-200':
             this.archivo ='PPS-4A-2c2017-200.csv';
             this.readCsvData();
              break;
            case 'PPS-4b-2c2017-201':
            this.archivo ='PPS-4b-2c2017-201.csv';
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

public verificarLista()
{
  this.existe=false;
  var ticks=0;
   //Recorremos la lista para detectar si ya fue cargada
   debugger;
   var Observable = this.Importacion.snapshotChanges(['child_added'])
   .subscribe(actions => {
   actions.forEach(action => {
     if(action.payload.val()["Titulo"]==this.archivo && this.existe==false)
     {
     this.AlertMensaje("Esta lista ya fue importada el dia " + action.payload.val()["Fecha"],"Lista duplicada");
     this.existe=true;
     return;
     }
   });
   
  });
    
  this.repetidor = setInterval(()=>{
    this.Tiempo++;
    if(this.Tiempo==2)
      {
        if(this.existe)
          {this.Tiempo=0;clearInterval(this.repetidor);}
        else
          {
        this.Tiempo=0;
        this.TerminarTimer();
        this.guardarLista();
        clearInterval(this.repetidor);
        }
      }
  }, 1000);

}
  public guardarLista()
  {     

   
    //Guardamos la Importacion
    this.Importacion.push({
      Titulo: this.archivo,
      Fecha : this.Fecha.getDate()+"/"+(this.Fecha.getMonth()+1)
      });  

        var tit = this.archivo.split("-");
    //guardamos los Alumnos importados
        for (var index = 0; index < this.csvData.length-1; index++) {
            var element = this.csvData[index];
              var element2 = element[0];
            var elementDia=element[2].split(" ");
            var aula = tit[3].split(".");
              this.lista.push({
                Legajo: element[0],
                Nombre : element[1],
                Aula: aula[0],
                Materia: tit[0],
                Dia: elementDia[0],
                HorarioI:elementDia[2],
                HorarioF:elementDia[3],
                });  
            }
            this.existe=false;
            this.AlertMensaje("La lista fue agregada exitosamente!","Proceso finalizado");
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
  


  //hola
//probadno comit
}
