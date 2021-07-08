import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss']
})
export class AnonymousComponent implements OnInit {
  router: Router;

  constructor(_router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
  }

  goToLogin(event: MouseEvent): void {
    //window.location.href = "https://localhost:44399/authorize?appid=123456";
    window.location.href = "https://partner.epsuat.com.my/auth/authorize?appid=123456";
  }
}
