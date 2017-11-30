import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,ModalController, Modal, ModalOptions } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { QRPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { GraficosPage } from '../pages/graficos/graficos';
import { RegistrarPage } from '../pages/registrar/registrar';
import { TomarAsistenciaPage } from '../pages/tomar-asistencia/tomar-asistencia';
import { ListaAsistenciaPage } from '../pages/lista-asistencia/lista-asistencia';
import { TomarFotoPage } from '../pages/tomar-foto/tomar-foto';
import { ExcelPage } from '../pages/excel/excel';
import { AbmAlumnosPage } from '../pages/abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../pages/abm-profy-admin/abm-profy-admin';
import { AltaEncuesta } from '../pages/alta-encuesta/alta-encuesta';
import { EncuestaPage } from '../pages/encuesta/encuesta';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 //rootPage: any = HomePage;
 // rootPage: any = TomarAsistenciaPage;
 rootPage: any = LoginPage;
  pages: Array<{title: string, component: any,type:string}>;

  constructor(  private translate: TranslateService, private config: Config,public modalCtrl: ModalController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initTranslate();
    this.initializeApp();

    // used for an example of ngFor and navigation


   
      this.pages = [
        
          { title: 'Tomar asistencia', component: TomarAsistenciaPage,type:'button'},
          { title: 'Tomar foto del aula', component: TomarFotoPage,type:'button'},
          { title: 'Creador de Encuestas', component: AltaEncuesta, type:'button'},
          { title: 'Encuesta del dia', component: EncuestaPage, type:'button'},
         
          { title: 'Graficos Estadisticos', component: GraficosPage, type:'button'},
          { title: 'Importar Excel', component: ExcelPage,type:'button'},
         
          { title: '------------Sección ABM------------', component: HomePage,type:'section'},
          { title: 'Usuarios', component:AbmProfyAdminPage,type:'button'},
          { title: 'Alumnos', component:AbmAlumnosPage,type:'button'}
        ];
    
    
    

  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');


    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.type=='button'){
//configuracion vieja
   // this.nav.push(page.component);

//prueba braa
    const MyModalOption : ModalOptions ={
      enableBackdropDismiss : false
    };
    let profileModal : Modal = this.modalCtrl.create(page.component, MyModalOption);
    profileModal.present(); 


   // this.nav.setRoot(page.component);
    }

  }
}

