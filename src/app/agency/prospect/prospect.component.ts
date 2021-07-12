import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.css']
})
export class ProspectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(1)').addClass('active');
  }

}
