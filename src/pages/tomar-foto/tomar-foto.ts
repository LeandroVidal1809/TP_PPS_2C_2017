import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
//import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

/**
 * Generated class for the TomarFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tomar-foto',
  templateUrl: 'tomar-foto.html',
})
export class TomarFotoPage {
  AulaSelect:string;
  public myPhoto: any;
  public myPhotosRefLindas: any;
  public myPhotoURL: any;
  list: AngularFireList<any>;
  constructor(public translate: TranslateService,public navCtrl: NavController,
             public navParams: NavParams,
          
            db:AngularFireDatabase,
              private view: ViewController,
            private _auth:AngularFireAuth) 
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    console.log('Language changed to ' + this.translate.currentLang);
  });
    this.myPhotosRefLindas = firebase.storage().ref('/Aulas/');
    this.list=db.list('/Aula');
    
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
    console.log('ionViewDidLoad TomarFotoPage');
  }



  takePhotoLindas() 
  {
   /*  this.Camera.getPicture({
      quality: 100,
      destinationType: this.Camera.DestinationType.DATA_URL,
      sourceType: this.Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
      
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhotoLindas();

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    }); */
  }

  private uploadPhotoLindas(): void 
  {

    this.myPhotosRefLindas.child(this.generateUUID())
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => { 
        this.myPhotoURL = savedPicture.downloadURL; 
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


  asociar()
  {
    this.list.push({
      aula: this.AulaSelect,
      foto: this.myPhotoURL
    }); 
  }

}
