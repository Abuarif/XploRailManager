import { Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Login } from '../login/login';
import { HomePage } from '../home/home';
import { DataApi } from '../../providers/data-api';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  private serverPath: string = 'https://explorail.prasarana.com.my/gamecenter';
  private location: string = '';
  private token: string;
  private user_id: string;
  private debug: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataApi: DataApi, private nav: Nav) {
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave Settings');
    this.dataApi.update('serverPath', this.serverPath);
    this.dataApi.update('location', this.location);
    this.dataApi.update('debug', this.debug);

    if (this.debug) {
      this.token = '10010060';
      this.dataApi.update('token', this.token);
      this.user_id = '48';
      this.dataApi.update('user_id', this.user_id);
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Settings');
    if (this.serverPath == '') {
      this.serverPath = this.dataApi.get('serverPath');
    }
    if (this.location == '') {
      this.location = this.dataApi.get('location');
    }
    this.user_id = this.dataApi.get('user_id');
    this.token = this.dataApi.get('token');
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
    this.nav.popToRoot(HomePage);
  }

  login() {
    this.navCtrl.push(Login, {serverPath: this.serverPath});
  }
}
