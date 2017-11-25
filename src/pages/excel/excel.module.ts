import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcelPage } from './excel';

@NgModule({
  declarations: [
    ExcelPage,
  ],
  imports: [
    IonicPageModule.forChild(ExcelPage),
  ],
})
export class ExcelPageModule {}
