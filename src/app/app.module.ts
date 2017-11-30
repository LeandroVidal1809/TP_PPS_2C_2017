import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Inject, PLATFORM_ID  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QRPage } from '../pages/list/list';
import { File } from '@ionic-native/file';
import { LoginPage } from '../pages/login/login';
import { GraficosPage } from '../pages/graficos/graficos';
import { RegistrarPage } from '../pages/registrar/registrar';
import { ConsultaPage } from '../pages/consulta/consulta';
import { TomarAsistenciaPage } from '../pages/tomar-asistencia/tomar-asistencia';
import { TomarFotoPage } from '../pages/tomar-foto/tomar-foto';
import { ListaAsistenciaPage } from '../pages/lista-asistencia/lista-asistencia';
import { ExcelPage } from '../pages/excel/excel';
import { ListaconsultaPage } from '../pages/listaconsulta/listaconsulta';
import { AbmAlumnosPage } from '../pages/abm-alumnos/abm-alumnos';
import { AltaEncuesta } from '../pages/alta-encuesta/alta-encuesta';
import { AbmProfyAdminPage } from '../pages/abm-profy-admin/abm-profy-admin';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EncuestaPage } from '../pages/encuesta/encuesta';
import { Modificar } from '../pages/modificar/modificar';
//import { Push } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import { NativeAudio } from '@ionic-native/native-audio';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Toast } from '@ionic-native/toast';
import {UniversalTranslateLoader  } from '@ngx-universal/translate-loader';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http  } from '@angular/http';
import { HttpClient } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyDGhCp0KcrN7-QL49H_xHtlVVPswyNagCo",
  authDomain: "tpfinalpps-68471.firebaseapp.com",
  databaseURL: "https://tpfinalpps-68471.firebaseio.com",
  projectId: "tpfinalpps-68471",
  storageBucket: "tpfinalpps-68471.appspot.com",
  messagingSenderId: "193916278651"
};

/* export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} */
export function translateFactory(platformId: any, http: Http, httpClient: HttpClient): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(httpClient);
  return new UniversalTranslateLoader(platformId, browserLoader, './i18n');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QRPage,
    LoginPage,
    Modificar,
    GraficosPage,
    RegistrarPage,
    TomarAsistenciaPage,
    ListaAsistenciaPage,
    TomarFotoPage,
    ExcelPage,
    AbmAlumnosPage,
    AbmProfyAdminPage,
    ConsultaPage,
    EncuestaPage,
    ListaconsultaPage,AltaEncuesta
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [PLATFORM_ID, Http, HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot()
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QRPage,
    LoginPage,
    GraficosPage,
     EncuestaPage,
     Modificar,
    RegistrarPage,
    TomarAsistenciaPage,
    ListaAsistenciaPage,
    TomarFotoPage,
    ExcelPage,
    AbmAlumnosPage,
    AbmProfyAdminPage,
    ConsultaPage,
    ListaconsultaPage,
    AltaEncuesta

  ],
  providers: [
    StatusBar,BarcodeScanner,
    SplashScreen,NativeAudio,
    //Facebook,Push,
    File,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
