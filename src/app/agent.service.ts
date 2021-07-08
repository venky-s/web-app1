import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  //rootUrl = 'https://localhost:44387';
  rootUrl = 'https://partner.epsuat.com.my/agent';
  AccessInfoPath = '/access/info';

  constructor(private http: HttpClient) { }

  getAccessInfo(callback: Function): void {
    console.info("getAccessInfo");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    this.http.get(this.rootUrl + this.AccessInfoPath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      callback(data);
    },
    error => {
      callback(null);
      console.info('agent get access info error');
    });
  }
}
