import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


import { Api } from "../../providers/api";

@IonicPage()
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html',
  // providers: [HttpModule]
})
export class ScanResult {

  public scannedText: string;
  public location: string;
  public token: string;
  public isAvailableServer: boolean = false;
  selectedCountry:Country = new Country(1, 'Start');
  countries = [
     new Country(1, 'Start' ),
     new Country(2, 'End' ),
  ];

  private data: any;

  constructor(public _nav: NavController,
    private _navParams: NavParams,
    private _api: Api,
    private alertCtrl: AlertController,
    private _loadingController: LoadingController) {}

  ionViewDidLoad() {
    this.scannedText = this._navParams.get("scannedText");
    this.location = this._navParams.get("location");
    this.token = this._navParams.get("token");
    if (!localStorage.getItem('serverPath')) {
      this.showAlert();
    } else {
      this.isAvailableServer = true;
    }
  }

  submitBarcode() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Submit Barcode
    this._api.submitBarcode(this.token, this.location, this.scannedText, this.selectedCountry.id).then((result) => {
      loading.dismiss();
      this.data = result;
      console.log(this.data);
      alert("Barcode Submitted");
      this._nav.pop();
    }, (err) => {
      loading.dismiss();
      // Display submit barcode error code
      alert(err);
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Please specify your host server in Settings!',
      buttons: ['OK']
    });
    alert.present();
  }
}


export class Country {
  constructor(public id: number, public name: string) { }
}