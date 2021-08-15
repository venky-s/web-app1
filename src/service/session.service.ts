import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IdTokenJWT } from '../models/IdTokenJWT';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  login(idToken: string): void {
    if (idToken === undefined && idToken === null) {
      this.logout();
      return;
    }
    let jwt: IdTokenJWT = jwt_decode(idToken as any);
    sessionStorage.setItem("userId", jwt.nameid);
    sessionStorage.setItem("userName", jwt.unique_name);
    sessionStorage.setItem("idToken", idToken);
  }

  renewLogin(idToken: string): void {
    if (idToken === undefined && idToken === null) {
      this.logout();
      return;
    }
    sessionStorage.setItem("idToken", idToken);
  }

  logout(): void {
    let idToken = sessionStorage.getItem("idToken");
    if (idToken !== undefined && idToken !== null) {
      sessionStorage.removeItem("idToken");
    }
    this.router.navigateByUrl('/');
  }
}