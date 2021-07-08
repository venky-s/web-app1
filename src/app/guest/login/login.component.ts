import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../fera.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private feraService: FeraService) { }

  ngOnInit(): void {
    var params = new URLSearchParams(location.search);

    let authCode = params.get('AuthCode');
    if (authCode === undefined || authCode === null || authCode.length == 0) {
      this.router.navigateByUrl('/');
      return;
    }

    this.feraService.getToken(authCode, this.Login);  
  }

  Login = (success: boolean): void => {
    if (success) {
      this.feraService.getAuthorize(this.Authorize);
      return;
    }

    this.router.navigateByUrl('/');
  }

  Authorize = (id: number): void => {
    if (id == 1) {
      this.router.navigateByUrl('/backoffice');
      return;
    }
    if (id == 2) {
      this.router.navigateByUrl('/agency');
      return;
    }

    this.router.navigateByUrl('/');
  }
}
