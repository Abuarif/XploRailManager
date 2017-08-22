import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanResult } from "../scan-result/scan-result";
import { Http } from '@angular/http';
import { Login } from "../login/login";
import { Settings } from '../settings/settings';

import { Api } from '../../providers/api';
import { DataApi } from '../../providers/data-api';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [Http]
})
export class Scan {

  public scannedText: string;
  public startText: string;
  public endText: string;
  public startButton: boolean;
  public endButton: boolean;
  public location: string = '';
  public token: string = 'test';
  public user_id: string;

  public data: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private _loadingController: LoadingController,
    private _api: Api,
    private dataApi: DataApi
  ) {
    this.location = this.dataApi.get('location');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ScanPage');

    if (!this.dataApi.get('debug')) {
      this.dataApi.clear('token');
      this.dataApi.clear('user_id');
    }

    if (!this.dataApi.data.location) {
      this.navCtrl.push(Settings); ``
    }
    this.location = this.dataApi.get('location');
    this.user_id = this.dataApi.get('user_id');
    this.token = this.dataApi.get('token');
  }

  public scanQR() {
    if (!this.token) {
      this.navCtrl.push(Login);
    }
    this.startButton = false;
    this.endButton = false;

    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.startButton = false;
        this.endButton = false;
        return false;
      }
      console.log("Scanned successfully!");
      console.log(JSON.stringify(barcodeData));
      this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

  private goToResult(barcodeData) {
    console.log('gotoResult...');
    this.navCtrl.push(ScanResult, {
      scannedText: barcodeData.text
    });
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Please configure your application Settings!',
      buttons: ['OK']
    });
    alert.present();
  }

  getLocation() {
    let status: boolean = true;
    if (!this.location) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
