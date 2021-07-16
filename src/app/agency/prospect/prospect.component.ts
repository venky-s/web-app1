import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.css']
})
export class ProspectComponent implements OnInit {

  constructor() { }

  menuList = [
    { menuText: "Dashboard", menuLink: "./" },
    { menuText: "Registered Prospect", menuLink: "./registered-prospect" },
    { menuText: "Follow Up", menuLink: "./follow-up" },
    { menuText: "Application Submitted", menuLink: "./application-submitted" },
    { menuText: "Onboard", menuLink: "./onboard" },
    { menuText: "Not Intrested", menuLink: "./not-intrested" }
  ];
  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(1)').addClass('active');
  }

}
