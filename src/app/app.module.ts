import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QRPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { GraficosPage } from '../pages/graficos/graficos';
import { RegistrarPage } from '../pages/registrar/registrar';
import { TomarAsistenciaPage } from '../pages/tomar-asistencia/tomar-asistencia';
import { TomarFotoPage } from '../pages/tomar-foto/tomar-foto';
import { ListaAsistenciaPage } from '../pages/lista-asistencia/lista-asistencia';
import { ImportarPage } from '../pages/importar/importar';
import { ExcelPage } from '../pages/excel/excel';
import { AbmAlumnosPage } from '../pages/abm-alumnos/abm-alumnos';
import { AbmProfyAdminPage } from '../pages/abm-profy-admin/abm-profy-admin';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QRPage,
    LoginPage,
    GraficosPage,
    RegistrarPage,
    TomarAsistenciaPage,
    ListaAsistenciaPage,
    TomarFotoPage,
    ExcelPage,
    AbmAlumnosPage,
    AbmProfyAdminPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QRPage,
    LoginPage,
    GraficosPage,
    RegistrarPage,
    TomarAsistenciaPage,
    ListaAsistenciaPage,
    TomarFotoPage,
    ExcelPage,
    AbmAlumnosPage,
    AbmProfyAdminPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
