import { Component } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-info-profesor',
  templateUrl: 'info-profesor.html',
})
export class InfoProfesorPage {

  emailProf:string;
  listaProf: any;
  Email:string;
  Aula:string;
  Materia:string;
  Apellido:string;
  Nombre:string;

  constructor(public translate: TranslateService,public navCtrl: NavController , private view: ViewController,db:AngularFireDatabase, public navParams: NavParams) 
  {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed to ' + this.translate.currentLang);
    });
    this.emailProf = sessionStorage.getItem("EmailProf");

    this.listaProf= db.list('/Profesores/');
    

          var Observable = this.listaProf.snapshotChanges(['child_added'])
          .subscribe(actions => {
            actions.forEach(action => {

            if(action.payload.val()["Email"] == this.emailProf)
            {  
           
                this.Email=action.payload.val()["Email"],
                this.Aula=action.payload.val()["Aula"],
                this.Materia=action.payload.val()["Materia"],
                this.Apellido=action.payload.val()["Apellido"],
                this.Nombre=action.payload.val()["Nombre"]
              
            }
    
          });
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProfesorPage');
  }
  closeModal(){
    this.view.dismiss();
      }

}
