import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Scan } from './scan';

@NgModule({
  declarations: [
    Scan,
  ],
  imports: [
    IonicPageModule.forChild(Scan),
  ],
  exports: [
    Scan
  ]
})
export class ScanModule {}
