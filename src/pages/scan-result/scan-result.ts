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
    nric: '',
    start_date: '',
    end_date: ''
  };
  public startText: string;
  public endText: string;
  public eventText: string;
  public displayStartButton: boolean;
  public displayEndButton: boolean;

  constructor(public _nav: NavController,
    private _navParams: NavParams,
    private _api: Api,
    private dataApi: DataApi,
    private alertCtrl: AlertController,
    private _loadingController: LoadingController) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ScanResult');
    if (!this.dataApi.get('debug')) {
      this.dataApi.clear('token');
      this.dataApi.clear('user_id');
    }

    this.startText = "Start";
    this.endText = "End";
    this.eventText = "Attend";
    this.displayStartButton = true;
    this.displayEndButton = true;

    this.scannedText = this._navParams.get("scannedText");
    this.reason = this._navParams.get("reason");
    this.location = this.dataApi.get('location');
    if (this.location == 'Goodies Collection' || this.location == 'Event Registration') {
      this.status = 'event';
    } else {
      this.status = 'game';
    }
    this.token = this.dataApi.data.token;
    this.user_id = this.dataApi.data.user_id;
    if (!localStorage.getItem('serverPath')) {
      this.showAlert();
    } else {
      this.getRecord();
      this.isAvailableServer = true;
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

  private getRecord() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();

    //Submit Barcode
    this._api.getAttendance(this.token, this.scannedText, this.user_id)
      .then((result) => {
        loading.dismiss();
        this.attendance = new Attendance(result);

        this.lastAttendance.group = this.attendance.group;
        this.lastAttendance.location = this.attendance.location;
        this.lastAttendance.start_date = this.attendance.start_date;
        this.lastAttendance.end_date = this.attendance.end_date;
        this.lastAttendance.name = this.attendance.name;
        this.lastAttendance.nric = this.attendance.nric;

        if (
          (this.lastAttendance.location === this.location) &&
          (this.lastAttendance.nric === this.scannedText)
        ) {
          // alert('Matched..');
          if (this.lastAttendance.start_date && (!this.lastAttendance.end_date)) {
            // alert('hide start');
            this.displayStartButton = false;
            this.displayEndButton = true;
          } else if ((!this.lastAttendance.start_date) && (this.lastAttendance.end_date)) {
            // alert('hide end');
            this.displayStartButton = true;
            this.displayEndButton = false;
          } else if ((this.lastAttendance.start_date) && (this.lastAttendance.end_date)) {
            // alert('hide end');
            this.displayStartButton = false;
            this.displayEndButton = false;
          }
        } else {
          // alert('Not Matched..');
          this.displayStartButton = true;
          this.displayEndButton = false;
        }
      }, (err) => {
        loading.dismiss();
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
  public nric: string;

  constructor(public data: any) {
    this.group = data.group;
    this.location = data.location;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.user_id = data.user_id;
    this.name = data.name;
    this.nric = data.nric;
  }
}