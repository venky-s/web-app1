import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../../service/fera.service';
import { SessionService } from '../../../service/session.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private feraService: FeraService, private session: SessionService) {
    var $this = this;

    window.onload = function() {
      var params = new URLSearchParams(location.search);

      let authCode = params.get('AuthCode');
      authCode = "25gNGGmp9yw1LqIqHvu6Tb8tClTU2xw0Sv53pl6vSChW1Fb9KO";
      if (authCode === undefined || authCode === null || authCode.length == 0) {
        $this.router.navigateByUrl('/');
        return;
      }

      $this.feraService.getToken(authCode, $this.Login, true);
    };
  }

  Login = (idToken: string): void => {
    if (idToken === undefined || idToken === null || idToken.length == 0) {
      this.router.navigateByUrl('/');
      return;
    }
    
    this.session.login(idToken);
    this.feraService.getAuthorize(this.Authorize, true);
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
