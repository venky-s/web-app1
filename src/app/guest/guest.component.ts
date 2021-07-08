import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../fera.service';
import jwt_decode from 'jwt-decode';
import { IdTokenJWT } from '../IdTokenJWT';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  constructor(private router: Router, private feraService: FeraService) { }

  ngOnInit(): void {
    let idToken = sessionStorage.getItem("idToken");
    if (idToken !== undefined && idToken !== null) {
      this.feraService.getAuthorize(this.TryAuthorize);
    }
  }

  TryAuthorize = (id: number): void => {
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
