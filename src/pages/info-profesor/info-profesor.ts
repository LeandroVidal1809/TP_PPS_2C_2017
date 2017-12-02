import { Component } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';



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
  tipo:string;
  Foto:string;
  constructor(public navCtrl: NavController , public alertCtrl: AlertController, private view: ViewController,db:AngularFireDatabase, public navParams: NavParams) 
  {

    this.emailProf = sessionStorage.getItem("EmailProf");
    this.tipo = sessionStorage.getItem("type");
    this.Foto= "assets/imgs/3.jpg";
    if(this.tipo!="profesor"){
      this.showAlert("No eres un profesor","Sin Permisos");
      this.view.dismiss();
    }
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

  showAlert(mensaje:string,titulo:string) {
    
    

    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProfesorPage');
  }
  closeModal(){
    this.view.dismiss();
      }

}
