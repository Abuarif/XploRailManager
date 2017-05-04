import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataApi {
  public data = {
    serverPath: '',
    token: '',
    location: '',
    email:''
  };

  constructor(public http: Http) {
    console.log('Hello Data Provider');
  }

  public store(key:string, value:any) {
    
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, value);
    } 
    this.get(key);
  }

  public update(key:string, value:any) {
    localStorage.setItem(key, value);
    this.get(key);
  }

  public clear(key:string) {
    localStorage.removeItem(key);
  }

  public flush() {
    localStorage.clear();
  }

  public get(key) {
    let temp = localStorage.getItem(key);
    if (key == 'email') {
      this.data.email = temp;
    } else if (key == 'serverPath') {
      this.data.serverPath = temp;
    } else if (key == 'token') {
      this.data.token = temp;
    } else if (key == 'location') {
      this.data.location = temp;
    }
    return temp;
  }
  
}
