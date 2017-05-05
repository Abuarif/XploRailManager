import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Setting } from '../setting/setting';
import { DataApi } from '../../providers/data-api';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  private serverPath: string;
  private location: string;
  private token: string;
  private user_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataApi: DataApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
    if (!this.dataApi.get('serverPath')) {
      this.showAlert();
      this.navCtrl.push(Setting);
    }
    this.serverPath = this.dataApi.get('serverPath');
    this.location = this.dataApi.get('location');
    this.user_id = this.dataApi.get('user_id');
    this.token = this.dataApi.get('token');
    console.log('ServerPath: ' + this.serverPath);
  }

  gotoSetting() {
    console.log('Goto Setting..');
    this.navCtrl.push(Setting);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'Please specify your host server in Settings!',
      buttons: ['OK']
    });
    alert.present();
  }

  logout() {
    this.dataApi.flush();
  }
}
