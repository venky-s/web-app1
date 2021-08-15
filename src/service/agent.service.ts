import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeraService } from './fera.service';
import { environment } from '../environments/environment';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  AccessInfoPath = '/me';

  constructor(private http: HttpClient, private feraService: FeraService) { }

  getAccessInfo = (callback: Function, fresh: boolean = false): void => {
    console.info("getAccessInfo");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    //$('#awaiting').show();
    this.http.get(environment.agentApiPath + this.AccessInfoPath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data != null && data.code !== undefined && data.code != null) {
        if (data.code == 401001) {
          var $this = this;
          this.feraService.refreshToken(function() { $this.getAccessInfo(callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      callback(null);
      console.info('agent get access info error');
      //$('#awaiting').hide();
    });
  }
}
