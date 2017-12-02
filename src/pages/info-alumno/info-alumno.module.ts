import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAlumnoPage } from './info-alumno';

@NgModule({
  declarations: [
    InfoAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAlumnoPage),
  ],
})
export class InfoAlumnoPageModule {}
