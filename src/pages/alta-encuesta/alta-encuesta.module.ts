import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaEncuesta } from './alta-encuesta';

@NgModule({
  declarations: [
    AltaEncuesta,
  ],
  imports: [
    IonicPageModule.forChild(AltaEncuesta),
  ],
})
export class AbmAlumnosPageModule {}
