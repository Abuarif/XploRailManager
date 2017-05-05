import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanResult } from "../scan-result/scan-result";
import { Http } from '@angular/http';
import { Login } from "../login/login";

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [Http]
})
export class Scan {

  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  private eventId: number;
  public eventTitle: string;
  public location: string = '...';
  public token: string = 'test';
  public locations: any = ['Event Registration', 'Goodies Collection', 'Check Point 1', 'Check Point 2', 'Check Point 3', 'Check Point 4', 'Check Point 5'];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');

    if (!localStorage.getItem("token")) {
      this.navCtrl.push(Login);
    }

    if (!localStorage.getItem("location")) {
      this.showAlert();
    } else {
      this.location = localStorage.getItem("location");
    }
    this.eventId = this.navParams.get('eventId');
    this.eventTitle = this.navParams.get('eventTitle');

    this.buttonText = "Scan";
    this.loading = false;
  }

  public scanQR() {
    // this.buttonText = "Loading..";
    this.loading = false;

    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.buttonText = "Scan";
        this.loading = false;
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
      scannedText: barcodeData.text,
      location: this.location
    });
  }

  public setLocation(id) {
    this.location = this.locations[id];
    localStorage.setItem('location', this.location);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Please specify your current location / event!',
      buttons: ['OK']
    });
    alert.present();
  }
}
