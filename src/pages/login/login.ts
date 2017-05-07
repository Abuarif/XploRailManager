import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from "../../providers/api";
import { DataApi } from "../../providers/data-api";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public newUser = {
    serverPath: '',
    email: '',
    password: ''
  };
  
  public loginFormControl: FormGroup;
  private data: any;
  // private host: string = 'https://mtas.prasarana.com.my/explorail';
  constructor(
    private _nav: NavController,
    public navParams: NavParams,
    private _loadingController: LoadingController,
    private _formBuilder: FormBuilder,
    private _api: Api,
    private dataApi: DataApi) {
    // Create FormControl to validate fields
    this.loginFormControl = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave LoginPage');
    if (!this.data) {
      alert('Abort Login');
    } else {
    this.dataApi.update('token', this.data.key);
    this.dataApi.update('user_id', this.data.user_id);
    }
  }

  public login() {

    // Validation
    if (!this.loginFormControl.valid) {
      alert("Invalid fields!");
      return;
    }

    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Take the values from  the form control
    this.newUser.serverPath = this.dataApi.get('serverPath');
    this.newUser.email = this.loginFormControl.get("email").value.trim();
    this.newUser.password = this.loginFormControl.get("password").value;

    console.log(JSON.stringify(this.newUser));

    //Sign in
    this._api.signin(this.newUser.serverPath, this.newUser.email, this.newUser.password).then((result) => {
      loading.dismiss();
      this.data = result;
      console.log(this.data);
      // Save token and server path to localStorage
      localStorage.setItem('token', this.data.key);
      localStorage.setItem('user_id', this.data.user_id);
      localStorage.setItem('serverPath', this.newUser.serverPath);
      // Close login page after successful signin
      this._nav.pop();
    }, (err) => {
      loading.dismiss();
      // Display signin error code
      alert(err);
    });
  }

}
