import { Component, OnInit } from '@angular/core';
import { FeraService } from '../../../service/fera.service';
import { UserProfile } from '../../../models/User';

declare var $: any;

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.css']
})
export class ProspectComponent implements OnInit {
  userProfile: UserProfile;

  constructor(private feraService: FeraService) { }

  menuList = [
    { menuText: "Dashboard", menuLink: "./" },
    { menuText: "Registered Prospect", menuLink: "./registered-prospect" },
    { menuText: "Follow Up", menuLink: "./follow-up" },
    { menuText: "Application Submitted", menuLink: "./application-submitted" },
    { menuText: "Onboard", menuLink: "./onboard" },
    { menuText: "Not Intrested", menuLink: "./not-intrested" }
  ];

  ngOnInit(): void {
    this.feraService.getProfile(this.BindProfile, true);
  }

  BindProfile = (data: any): void => {
    if (this.userProfile == null)
      this.userProfile = new UserProfile('pending...','pending...','pending...','pending...','pending...','pending...','pending...','pending...',null,null);

    if (data !== undefined && data != null) {
      this.userProfile.Email = data.email;
      this.userProfile.AvatarImage64 = data.avatarImage64 === undefined || data.avatarImage64 === null ? '/assets/img/sample-no-picture.png' : data.avatarImage64;
      this.userProfile.QRUidUrl = data.qrUidUrl;
      this.userProfile.QRImage64 = data.qrImage64 === undefined || data.qrImage64 === null ? '/assets/img/sample-no-picture.png' : data.qrImage64;
    }
  }
}
