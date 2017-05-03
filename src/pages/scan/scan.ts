import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanResult } from "../scan-result/scan-result";
// import { Login } from "../login/login";

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class Scan {

  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  private eventId: number;
  public eventTitle: string;
  public location: string = '...';
  public locations: any = ['Event Registration', 'Goodies Collection', 'Check Point 1', 'Check Point 2', 'Check Point 3', 'Check Point 4', 'Check Point 5'];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');

    if (!localStorage.getItem("token")) {
      // this.navCtrl.push(Login);
    }

    if (!localStorage.getItem("location")) {
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
      console.log(barcodeData);
      this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

  private goToResult(barcodeData) {
    this.navCtrl.push(ScanResult, {
      scannedText: barcodeData.text
    });
  }

  public setLocation(id) {
    this.location = this.locations[id];
    localStorage.setItem('location', this.location);
  }
}
