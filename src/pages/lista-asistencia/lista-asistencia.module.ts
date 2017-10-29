import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAsistenciaPage } from './lista-asistencia';

@NgModule({
  declarations: [
    ListaAsistenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAsistenciaPage),
  ],
})
export class ListaAsistenciaPageModule {}
