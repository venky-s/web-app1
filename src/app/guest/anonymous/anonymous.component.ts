import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
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
    window.location.href = environment.authPath + "/authorize?appid=123456";
  }
}
