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
  public name: string = '';
  public token: string = 'test';
  public user_id: string;

  public logs: any;
  public data: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private _loadingController: LoadingController,
    private api: Api,
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
    this.name = this.dataApi.get('name');
    if (!this.token) {
      this.navCtrl.push(Login);
    }
    if (this.location == null) {
      this.navCtrl.push(Settings);
    }
    this.getLog();
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

  private getLog() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Submit Barcode
    this.api.get_log(this.token, this.user_id)
      .then((result) => {
        loading.dismiss();
        this.logs = result;
        this.parseLog();
      }, (err) => {
        loading.dismiss();
        // Display submit barcode error code
        alert(err);
      });
  }

  private parseLog() {
    this.logs.forEach(element => {
      let diffInMs: number = Date.parse(element.Attendance.end_date) - Date.parse(element.Attendance.start_date);
      element.Attendance.duration = diffInMs / 1000;
    });
  }
}
