import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../service/fera.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private router: Router, private feraService: FeraService) { }

  ngOnInit(): void {
    let idToken = sessionStorage.getItem("idToken");
    if (idToken !== undefined && idToken !== null) {
      this.feraService.getAuthorize(this.TryAuthorize, true);
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
