import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-prospect',
  templateUrl: './registered-prospect.component.html',
  styleUrls: ['./registered-prospect.component.css']
})
export class RegisteredProspectComponent implements OnInit {

  constructor(private router: Router) { }

  newProspectBtn(){    
      this.router.navigate(['/agency/my-qr']);
  }
  ngOnInit(): void {
  }

}
