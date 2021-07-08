import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeraService {
  //rootUrl = 'https://localhost:44397';
  rootUrl = 'https://partner.epsuat.com.my/fera';
  getTokenPath = '/gettoken';
  renewTokenPath = '/gettoken/renew';
  authorizePath = '/authorize';
  authorizeBackofficePath = '/authorize/backoffice';
  authorizeAgencyPath = '/authorize/agency';
  profilePath = '/profile';
  sendQRPath = '/profile/sendemail';

  constructor(private http: HttpClient) { }

  getToken = (authCode:string, callback: Function): void => {
    console.info("getToken");
    let resp = this.http.get(this.rootUrl + this.getTokenPath + '/' + authCode, { responseType: 'text' })
    resp.subscribe((data: string) => {
      if (data !== undefined && data != null && data.length > 0) {
        sessionStorage.setItem("idToken", data);
        callback(true);
        return;
      }
      callback(false);
    },
    error => {
      callback(false);
    });
  }

  getProfile = (callback: Function): void => {
    console.info("getProfile");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    this.http.get(this.rootUrl + this.profilePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      console.info(data);
      if (data !== undefined && data != null && data.code !== undefined && data.code != null) {
        if (data.code == 401001) {
          this.refreshToken(this.getProfile, callback);
          return;
        }
        callback(null);
        return;
      }

      callback(data);
    },
    error => {
      console.info(error);
      callback(null);
      console.info('fera get profile error');
    });
  }

  getAuthorize = (callback: Function): void => {
    console.info("getAuthorize");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(0);
      return;
    }

    this.http.get(this.rootUrl + this.authorizePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data != null) {
        if (data.code !== undefined && data.code != null) {
          if (data.code == 401001) {
            this.refreshToken(this.getAuthorize, callback);
            return;
          }
          callback(0);
          return;
        }

        callback(data.isBackOffice ? 1 : 2);
        return;
      }
      callback(0);
    },
    error => {
      console.info(error);
      callback(0);
    });
  }

  getAuthorizeBackoffice = (callback: Function): void => {
    console.info("getAuthorizeBackoffice");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }
    
    this.http.get(this.rootUrl + this.authorizeBackofficePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      console.info(data);
      if (data !== undefined && data != null && data.code !== undefined && data.code != null) {
        if (data.code == 401001) {
          this.refreshToken(this.getAuthorizeBackoffice, callback);
          return;
        }
        callback(false);
        return;
      }
      
      callback(true);
    },
    error => {
      console.info(error);
      callback(false);
    });
  }

  getAuthorizeAgency = (callback: Function): void => {
    console.info("getAuthorizeAgency");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    this.http.get(this.rootUrl + this.authorizeAgencyPath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data != null && data.code !== undefined && data.code != null) {
        if (data.code == 401001) {
          this.refreshToken(this.getAuthorizeAgency, callback);
          return;
        }
        callback(false);
        return;
      }

      callback(true);
    },
    error => {
      console.info(error);
      callback(false);
    });
  }

  sendEmail = (emailAddr: string, callback: Function): void => {
    console.info("getAuthorizeAgency");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    this.http.post(this.rootUrl + this.sendQRPath, { email: emailAddr }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data != null && data.code !== undefined && data.code != null) {
        if (data.code == 401001) {
          this.refreshToken(this.getAuthorizeAgency, callback);
          return;
        }
        callback(false);
        return;
      }

      callback(true);
    },
    error => {
      console.info(error);
      callback(false);
    });
  }

  refreshToken(callback: Function, innerCallback: Function): void {
    console.info("refreshToken");
    let idToken = sessionStorage.getItem("idToken");
    console.info(idToken);
    if (idToken === undefined || idToken === null) {
      callback(innerCallback);
      return;
    }
    
    this.http.get(this.rootUrl + this.renewTokenPath, { 
      responseType: 'text',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: string) => {
      if (data !== undefined && data != null && data.length > 0) {
        sessionStorage.setItem("idToken", data);
        callback(innerCallback);
        return;
      }
      callback(innerCallback);
    },
    error => {
      callback(innerCallback);
    });
  }
}