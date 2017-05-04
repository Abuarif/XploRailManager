import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {

  constructor(private http: Http) {}

  public signin(ipAddr, username, password) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(ipAddr+'/api/web_login', { username: username, password: password }, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public submitBarcode(token, location, text, reason) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', localStorage.getItem("token"));

      this.http.post(localStorage.getItem('serverPath')+'/api/barcode', { token: token, location: location,text: text, reason: reason }, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
