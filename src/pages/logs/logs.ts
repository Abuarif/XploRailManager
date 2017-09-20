import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Api } from "../../providers/api";
import { DataApi } from "../../providers/data-api";

@IonicPage()
@Component({
  selector: 'page-logs',
  templateUrl: 'logs.html',
})
export class Logs {
  public logs: any;
  public token: string;
  public user_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public dataApi: DataApi,
    public _loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Logs');
    if (!this.dataApi.get('debug')) {
      this.dataApi.clear('token');
      this.dataApi.clear('user_id');
    }

    this.token = this.dataApi.get('token');
    this.user_id = this.dataApi.get('user_id');
    this.getHistory();
  }

  private getHistory() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Submit Barcode
    this.api.get_submission_history(this.token, this.user_id)
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
      if (this.logs.Attendance.end_date != '') {
        let diffInMs: number = Date.parse(this.logs.Attendance.end_date) - Date.parse(this.logs.Attendance.start_date);
        this.logs.Attendance.duration = diffInMs / 1000;
      }
    });
  }
}
