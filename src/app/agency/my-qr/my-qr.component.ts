import { Component, OnInit } from '@angular/core';
import { FeraService } from '../../../service/fera.service';
import { User, UserProfile } from '../../../models/User';

declare var $: any;

@Component({
  selector: 'app-my-qr',
  templateUrl: './my-qr.component.html',
  styleUrls: ['./my-qr.component.css']
})
export class MyQrComponent implements OnInit {
  user: User | undefined;
  userProfile: UserProfile;
  prospectEmail: string = '';
  sendQrMsg: string;

  constructor(private feraService: FeraService) {
    this.userProfile = new UserProfile('pending...','pending...','pending...','pending...','pending...','pending...','pending...','pending...',null,null);
  }

  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(3)').addClass('active');

    this.feraService.getProfile(this.BindProfile, true);
  }

  BindProfile = (data: any): void => {
    if (data !== undefined && data != null) {
      this.userProfile.Email = data.email;
      this.userProfile.AvatarImage64 = data.avatarImage64 === undefined || data.avatarImage64 === null ? '/assets/img/sample-no-picture.png' : data.avatarImage64;
      this.userProfile.QRUidUrl = data.qrUidUrl;
      this.userProfile.QRImage64 = data.qrImage64 === undefined || data.qrImage64 === null ? '/assets/img/sample-no-picture.png' : data.qrImage64;
    }
  }

  sendQR(event: MouseEvent): void {
    $('#msgError').hide();
    this.sendQrMsg = '';
    this.feraService.emailQRUId(this.prospectEmail, this.sendQRUIdResult, true);
  }

  sendQRUIdResult = (success: boolean) => {
    if (success) {
      this.sendQrMsg = 'Success';
      $('#msgError').show();
    }
    else {
      this.sendQrMsg = 'Failed';
      $('#msgError').show();
    }
  }
}
