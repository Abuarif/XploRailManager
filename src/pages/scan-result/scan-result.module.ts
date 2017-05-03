import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanResult } from './scan-result';

@NgModule({
  declarations: [
    ScanResult,
  ],
  imports: [
    IonicPageModule.forChild(ScanResult),
  ],
  exports: [
    ScanResult
  ]
})
export class ScanResultModule {}
