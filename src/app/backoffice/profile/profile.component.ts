import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../fera.service';
import { AgentService } from '../../agent.service';
import { UserProfile } from '../../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userProfile: UserProfile

  constructor(private router: Router, private feraService: FeraService, private agentService: AgentService) {
    this.userProfile = new UserProfile('pending...','pending...','pending...','pending...','pending...','pending...','pending...','pending...',null,null);
  }

  ngOnInit(): void {
    this.agentService.getAccessInfo(this.BindAccessInfo);
    this.feraService.getProfile(this.BindProfile);
  }

  BindProfile = (data: any): void => {
    if (data !== undefined && data != null) {
      this.userProfile.Email = data.email;
      this.userProfile.AvatarImage64 = data.avatarImage64 === undefined || data.avatarImage64 === null ? '/assets/img/sample-no-picture.png' : data.avatarImage64;
      this.userProfile.QRUidUrl = data.qrUidUrl;
      this.userProfile.QRImage64 = data.qrImage64 === undefined || data.qrImage64 === null ? '/assets/img/sample-no-picture.png' : data.qrImage64;
    }
  }

  BindAccessInfo = (data: any): void => {
    if (data !== undefined && data != null) {
      this.userProfile.BusinessEntity = data.businessEntity;
      this.userProfile.LoginType = data.loginType;
      this.userProfile.LoginName = data.loginName;
      this.userProfile.FullName = data.fullName;
      this.userProfile.BranchName = data.branchName;
      this.userProfile.RankName = data.rankName;
    }
  }
}
