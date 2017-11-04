import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 //rootPage: any = HomePage;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any,type:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,type:'button'},      
      { title: 'Tomar asistencia', component: TomarAsistenciaPage,type:'button'},
      { title: 'Tomar foto del aula', component: TomarFotoPage,type:'button'},
      { title: 'Graficos Estadisticos', component: GraficosPage, type:'button'},
      { title: 'Importar Excel', component: ExcelPage,type:'button'},
      { title: '------------Sección QR------------', component: HomePage,type:'section'},
      { title: 'Para Profesores', component:QRPage,type:'button'},
      { title: 'Para Alumnos', component:QRPage,type:'button'},
      { title: 'Para Encuestas', component:QRPage,type:'button'},
      { title: '------------Sección ABM------------', component: HomePage,type:'section'},
      { title: 'Administrativo', component:AbmProfyAdminPage,type:'button'},
      { title: 'Alumno', component:AbmAlumnosPage,type:'button'},
      { title: 'Profesores', component:AbmProfyAdminPage,type:'button'}
    ];
    

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
    this.nav.setRoot(page.component);
    }

  }
}
