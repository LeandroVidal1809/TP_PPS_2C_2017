import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { TomarAsistenciaPage } from '../tomar-asistencia/tomar-asistencia';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import { AlertController ,LoadingController, Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { File } from '@ionic-native/file';
/**
 * Generated class for the ListaAsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-asistencia',
  templateUrl: 'lista-asistencia.html',
})

export class ListaAsistenciaPage {
listado:Array<any>;
listadoP:Array<any>;
AulaFiltro:string;
MateriaFiltro:string;
ProfesorFiltro:string;
Presencia:boolean;
Fecha:Date;
Tiempo: number;
repetidor:any;
public myPhoto: any;
public myPhotosRefLindas: any;
public myPhotoURL: any;
public base64Image: string;
FechaHoy:string;
list: AngularFireList<any>;
Fotolist: AngularFireList<any>;
  constructor(public navCtrl: NavController,private Camera: Camera,public alertCtrl: AlertController,db:AngularFireDatabase, public navParams: NavParams, private view: ViewController,
    private _auth:AngularFireAuth) {
   this.Fecha =  new Date();
  var dia = this.Fecha.getDate();
  var mes = this.Fecha.getMonth()+1;
  var anio = this.Fecha.getFullYear();
  this.FechaHoy=dia+"/"+mes+"/"+anio;
  this.Tiempo=0;
    this.Fotolist = db.list('/FotoLista/');
    this.listadoP=new Array<any>();
    this.listado=JSON.parse(sessionStorage.getItem("lista"));
    this.AulaFiltro = this.listado[0].Aula;
    this.MateriaFiltro=this.listado[0].Materia;
    this.list = db.list('/Listado/'+this.AulaFiltro+'-'+this.MateriaFiltro+'-'+dia+'-'+mes+'-'+anio);
    this.myPhotosRefLindas = firebase.storage().ref('/Aulas/');
    this.listado.forEach(element => {
     var objecto = {
       "Legajo":element.Legajo,
       "Nombre":element.Nombre,
       "Presente":false
     }

       
     this.listadoP.push(objecto);
    });


//console.log("lista",this.listadoP);
  }
  logOut(){
    console.log("deslogeando");
      this._auth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
    }
  Cambio(index:any){
    if(this.listadoP[index].Presente==false)
      {
        this.listadoP[index].Presente=true;
      }  
    else
    {
    this.listadoP[index].Presente=false;
    }

  }
  Cerrar(){
    sessionStorage.clear();
    this.navCtrl.setRoot(TomarAsistenciaPage); 

  }
  closeModal(){
    sessionStorage.clear();
    this.view.dismiss();
    
  //  this.navCtrl.setRoot(TomarAsistenciaPage);
      }

TakePhoto() 
  {
    this.Camera.getPicture({
      quality: 100,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
      
    }).then(imageData => {
      this.myPhoto = imageData;
      this.base64Image = "data:image/jpeg;base64," + imageData;
   
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  
  private generateUUID(): any 
  {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

AgregarLista()
{
  console.log(this.listadoP);
  this.listadoP.forEach(element => {

    this.list.push({
      Legajo: element.Legajo,
      Nombre : element.Nombre,
      Presente: element.Presente});  
   });

   this.repetidor = setInterval(()=>{
    this.Tiempo++;
    if(this.Tiempo==3)
      {
     
        this.myPhotosRefLindas.child(this.generateUUID())
        .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
        .then((savedPicture) => { 
        this.myPhotoURL = savedPicture.downloadURL; 
        this.Fotolist.push({
          aula: this.AulaFiltro,
          foto: this.myPhotoURL,
          fecha: this.FechaHoy,
          materia:this.MateriaFiltro
        }); 
        });
        
        clearInterval(this.repetidor);      }
  }, 1000);

   this.showAlert("La lista de asistencia se ha cargado correctamente","Proceso finalizado")
   sessionStorage.clear();
   this.navCtrl.setRoot(TomarAsistenciaPage);
   }

showAlert(mensaje:string,titulo:string) {
  
  let alert = this.alertCtrl.create({
    title: titulo,
    subTitle: mensaje,
    buttons: ['OK']
  });
  alert.present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAsistenciaPage');
  }


}
