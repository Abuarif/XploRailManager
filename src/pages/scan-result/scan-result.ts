import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';


import { Api } from "../../providers/api";
import { DataApi } from "../../providers/data-api";

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
  public user_id: string;
  public reason: number;
  public status: string;
  public isAvailableServer: boolean = false;

  private data: any;
  public attendance: Attendance;
  public lastAttendance = {
    group: '',
    location: '',
    name: '',
    start_date: '',
    end_date: ''
  };
  public startText: string;
  public endText: string;
  public disableStartButton: boolean;
  public disableEndButton: boolean;

  constructor(public _nav: NavController,
    private _navParams: NavParams,
    private _api: Api,
    private dataApi: DataApi,
    private alertCtrl: AlertController,
    private _loadingController: LoadingController) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ScanResult');

    this.startText = "Start";
    this.endText = "End";
    this.disableStartButton = true;
    this.disableEndButton = true;

    this.scannedText = this._navParams.get("scannedText");
    this.reason = this._navParams.get("reason");
    this.location = this.dataApi.data.location;
    if (this.location == 'Goodies Collection' || this.location == 'Event Registration') {
      if (this.reason == 1) {
        this.status = 'Attend Event';
      }
    } else {
      if (this.reason == 1) {
        this.status = 'Start Game';
      } else {
        this.status = 'End Game';
      }
    }
    this.token = this.dataApi.data.token;
    this.user_id = this.dataApi.data.user_id;
    if (!localStorage.getItem('serverPath')) {
      this.showAlert();
    } else {
      this.getAttendance(this.scannedText);
      this.isAvailableServer = true;
      // alert('Start: ' + this.disableStartButton);
      // alert('End: ' + this.disableEndButton);
    }
  }


  submitBarcode(reason) {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();

    //Submit Barcode
    this._api.submitBarcode(this.token, this.location, this.scannedText, reason, this.user_id).then((result) => {
      loading.dismiss();
      this.data = result;
      console.log(this.data);
      alert("Attendance Submitted");
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

  private getAttendance(scannedText) {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();

    //Submit Barcode
    this._api.getAttendance(this.token, scannedText, this.user_id)
      .then((result) => {
        loading.dismiss();
        this.attendance = new Attendance(result);

        this.lastAttendance.group = this.attendance.group;
        this.lastAttendance.location = this.attendance.location;
        this.lastAttendance.start_date = this.attendance.start_date;
        this.lastAttendance.end_date = this.attendance.end_date;
        this.lastAttendance.name = this.attendance.name;

        // toggle scan-result start and end button
        // alert('log: ' + this.lastAttendance.location);
        // alert('mobile: ' + this.location);
        if (this.lastAttendance.location === this.location) {
          // alert('Matched..');
          if (this.lastAttendance.start_date && (!this.lastAttendance.end_date)) {
            // alert('hide start');
            this.disableStartButton = false;
          } else if ((!this.lastAttendance.start_date) && (this.lastAttendance.end_date)) {
            // alert('hide end');
            this.disableEndButton = false;
          } else if ((this.lastAttendance.start_date) && (this.lastAttendance.end_date)) {
            // alert('hide end');
            this.disableStartButton = false;
            this.disableEndButton = false;
          }
        } else {
          // alert('Not Matched..');
          this.disableEndButton = false;
          this.disableStartButton = false;
        }
      }, (err) => {
        loading.dismiss();
        // Display submit barcode error code
        alert(err);
      });
  }
}

export class Country {
  constructor(public id: number, public name: string) { }
}

export class Attendance {
  public group: string;
  public location: string;
  public start_date: string;
  public end_date: string;
  public user_id: number;
  public name: string;

  constructor(public data: any) {
    this.group = data.group;
    this.location = data.location;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.user_id = data.user_id;
    this.name = data.name;
  }
}