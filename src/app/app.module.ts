import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Scan } from '../pages/scan/scan';
import { ScanResult } from '../pages/scan-result/scan-result';
import { Logs } from '../pages/logs/logs';
import { Settings } from '../pages/settings/settings';
import { Setting } from '../pages/setting/setting';

import { TabsPage } from '../pages/tabs/tabs';
import { Api } from '../providers/api';
import { DataApi } from '../providers/data-api';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Scan,
    ScanResult,
    Logs,
    Settings,
    Setting,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Scan,
    ScanResult,
    Logs,
    Settings,
    Setting,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Api,
    DataApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
