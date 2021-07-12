import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewChecked {

  constructor(private route: Router){}

  ngOnInit(): void {
    $('#mainMenu li').removeClass('active');
    $('#mainMenu li:nth-child(2)').addClass('active');
    
    if (this.route.url.split('/').pop().toLowerCase() == 'content' ) {
      this.route.navigate(['/backoffice/content/byb']);
    }
  }

  ngAfterViewChecked(): void {
    if (this.route.url.split('/').pop().toLowerCase() == 'content' ) {
      this.route.navigate(['/backoffice/content/byb']);
    }
  }
}
