import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
  private serverPath: string = 'https://explorail.rapidkl.com.my/gamecenter';

  constructor(private http: Http) { }

  public signin(ipAddr, username, password) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(this.serverPath + '/api/signin.json?username=' + username + '&password=' + password)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public submitBarcode(token, location, text, reason, user_id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', localStorage.getItem("token"));

      this.http.get(this.serverPath + '/api/submit_attendance.json?token=' + token + '&location=' + location + '&text=' + text + '&reason=' + reason + '&user_id=' + user_id)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public getAttendance(token, text, user_id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', localStorage.getItem("token"));

      this.http.get(this.serverPath + '/api/get_attendance.json?token=' + token + '&text=' + text + '&user_id=' + user_id)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  public get_submission_history(token, user_id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', localStorage.getItem("token"));

      this.http.get(this.serverPath + '/api/get_submission_history.json?token=' + token + '&user_id=' + user_id)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
