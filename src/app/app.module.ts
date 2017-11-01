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
    TomarFotoPage
    
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
    TomarFotoPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
