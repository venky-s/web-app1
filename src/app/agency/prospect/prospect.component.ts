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
    { menuText: "Dashboard", menuLink: "/backoffice", menuStyle: "lnr-home" },
    { menuText: "Registered Prospect", menuLink: "./", menuStyle: "lnr-users" },
    { menuText: "Follow Up", menuLink: "./", menuStyle: "lnr-file-add" },
    { menuText: "Application Submitted", menuLink: "./", menuStyle: "lnr-graduation-hat" },
    { menuText: "Onboard", menuLink: "./", menuStyle: "lnr-book" },
    { menuText: "Not Intrested", menuLink: "./", menuStyle: "lnr-calendar-full" }
  ];
  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(1)').addClass('active');
  }

}
