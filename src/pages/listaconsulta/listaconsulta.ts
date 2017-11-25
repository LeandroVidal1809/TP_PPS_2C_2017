import { Component ,ElementRef,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import firebase from 'firebase';  
import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as papa from 'papaparse';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Chart } from 'chart.js';
/**
 * Generated class for the ListaconsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaconsulta',
  templateUrl: 'listaconsulta.html',
})
export class ListaconsultaPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  listado:Array<any>;
  listadoP:Array<any>;
  AulaFiltro:string;
  urlPhoto:string;
  MateriaFiltro:string;
  ProfesorFiltro:string;
  Presencia:boolean;
  csvData: any[] = [];
  Presente:number;
  Ausente:number;
  headerRow: any[] = [];
 
  Fecha:Date;
  Fechas:string;
  public myPhotosRefLindas: any;
  list: AngularFireList<any>;
    constructor(public navCtrl: NavController,private eltRef:ElementRef,private file: File, private http: Http,private db:AngularFireDatabase,public navParams: NavParams, private view: ViewController,
      private _auth:AngularFireAuth) {
        this.readCsvData();
     this.Fecha =  new Date();
     this.Presente=0;
  
     this.Ausente=0;
     this.list= this.db.list('/FotoLista');
     this.myPhotosRefLindas = firebase.storage().ref('/Aulas/');
     
      this.AulaFiltro = sessionStorage.getItem("Aula");
      this.MateriaFiltro=sessionStorage.getItem("Materia");
     this.Fechas=sessionStorage.getItem("Fecha");
      this.CargoFoto();
      debugger;
     
      
}


CargoEstadistica()
{
this.listado.forEach(element => {
    if(element['Presente']==true)
    {
      this.Presente++;
    }
    else
      this.Ausente++;
});

this.Graficar(this.Presente,this.Ausente);

}
CargoFoto()
{
  // this.Fechas = this.Fechas.replace("-","/");
   let re = /\-/gi;
   let result = this.Fechas.replace(re, "/");
  debugger;
  var Observable = this.list.snapshotChanges(['child_added'])
  .subscribe(actions => {
  actions.forEach(action => {
    console.log(action.payload.val());      
    debugger;
    if(action.payload.val()['aula']==this.AulaFiltro && action.payload.val()['materia']==this.MateriaFiltro && result==action.payload.val()['fecha'])
      {
        debugger;
        this.urlPhoto=action.payload.val()['foto'];
       
      }              
  });
  
  })
}
    //sss
    Cerrar(){
      sessionStorage.clear();
      this.navCtrl.setRoot(TomarAsistenciaPage); 
  
    }
    logOut(){
      console.log("deslogeando");
        this._auth.auth.signOut();
        this.navCtrl.setRoot(LoginPage);
      }
    closeModal(){
      sessionStorage.clear();
      this.view.dismiss();
      
    //  this.navCtrl.setRoot(TomarAsistenciaPage);
        }
  
        


    downloadToPdf()
    {
    
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaconsultaPage');
  }

  ngAfterViewInit() {
    this.listado=JSON.parse(sessionStorage.getItem("lista"));
    this.CargoEstadistica();

  }

     private readCsvData() {
      this.http.get('assets/archivos/PPS-4A-2c2017-200.csv')
        .subscribe(
        data => this.extractData(data),
        err => this.handleError(err)
        );
    }
   
    private extractData(res) {
      let csvData = res['_body'] || '';
      let parsedData = papa.parse(csvData).data;
   
      this.headerRow = parsedData[0];
   
      parsedData.splice(0, 1);
      this.csvData = parsedData;
    }
   
    downloadCSV() {
      let csv = papa.unparse({
        fields: this.headerRow,
        data: this.csvData
      });
   
      // Dummy implementation for Desktop download purpose
      var blob = new Blob([csv]);
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = "newdata.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
   
    private handleError(err) {
      console.log('something went wrong: ', err);
    }
   
    trackByFn(index: any, item: any) {
      return index;
    }
    ConvertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      var row = "";
  
      for (var index in objArray[0]) {
          //Now convert each value to string and comma-separated
          row += index + ';';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      str += row + '\r\n';
  
      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ';'
  
              line += array[i][index];
          }
          str += line + '\r\n';
      }
      return str;
  }
  

  
  Graficar(si:number,no:number)
  {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
                 type: 'bar',
                 data: {
                     labels: ["Presente", "Ausente"],
                     datasets: [{
                         label: 'Cantidad de Alumnos:  '+ (si + no),
                         data: [si,no],
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                                                    ],
                         borderColor: [
                             'rgba(255,99,132,1)',
                             'rgba(54, 162, 235, 1)'
                             
                         ],
                         borderWidth: 1
                     }]
                 },
                 options: {
                     scales: {
                         yAxes: [{
                             ticks: {
                                 beginAtZero:true
                             }
                         }]
                     }
                 }
      
             });
  }

}
