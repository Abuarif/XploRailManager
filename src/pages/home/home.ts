import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataApi } from '../../providers/data-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('bar2Canvas') bar2Canvas;
  @ViewChild('lineCanvas') lineCanvas;

  public location: string = '';
  public name: string = '';

  barChart: any;
  bar2Chart: any;
  lineChart: any;

  constructor(public navCtrl: NavController, public dataApi: DataApi) {

  }

  ionViewWillEnter() {
    if (!this.dataApi.get('debug')) {
      this.dataApi.clear('token');
      this.dataApi.clear('user_id');
    }
    this.location = this.dataApi.get('location');
    this.name = this.dataApi.get('name');
  }

}
