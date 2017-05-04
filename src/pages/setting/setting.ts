import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Nav } from 'ionic-angular';

import { Settings } from '../settings/settings';
import { DataApi } from '../../providers/data-api';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class Setting {
  public settings = {
    serverPath:''
  };
  public settingFormControl: FormGroup;
  
  constructor(
    private nav: Nav,
    private _nav: NavController,
    public navParams: NavParams,
    private _loadingController: LoadingController,
    private _formBuilder: FormBuilder,
    public dataApi: DataApi) {
      // Create FormControl to validate fields
    this.settingFormControl = new FormGroup({
      serverPath: new FormControl('', [Validators.required]),
    });
  }

  public setup() {

    // Validation
    if (!this.settingFormControl.valid) {
      alert("Invalid fields!");
      return;
    }

    //Take the values from  the form control
    this.settings.serverPath = this.settingFormControl.get("serverPath").value;
    this.dataApi.update('serverPath', this.settings.serverPath);

    this.nav.goToRoot(Settings);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Setting');
  }

}
