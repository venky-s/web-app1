import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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