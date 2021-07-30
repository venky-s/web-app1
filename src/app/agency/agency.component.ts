import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../service/fera.service';
import jwt_decode from 'jwt-decode';
import { User, UserProfile } from '../../models/User';
import { IdTokenJWT } from '../../models/IdTokenJWT';

declare var $: any;

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit, AfterViewInit {
  user: User | undefined;
  userProfile: UserProfile;
  prospectEmail: string = '';
  sendQrMsg: string;
  
  agencyMenuList = [
    { menuText: "e-Presenter", menuLink: "./", menuStyle:"fa fa-share-alt-square" },
    { menuText: "e-Potential Agent", menuLink: "./prospect", menuStyle:"lnr lnr-users" },
    { menuText: "Activities", menuLink: "./activities", menuStyle:"fa fa-wpforms" }   
  ];

  constructor(private router: Router, private feraService: FeraService) {
    this.userProfile = new UserProfile('pending...','pending...','pending...','pending...','pending...','pending...','pending...','pending...',null,null);
  }

  ngOnInit(): void {
    //let res = this.feraService.getAuthorizeAgency(this.AuthorizeAgency, true);
    let jwt: IdTokenJWT = {nameid: "100", unique_name: "Test User", role: "Dev"}
    this.user = new User("100", "Test User");
  }

  ngAfterViewInit(): void {
   /* $("#tabSwitch > li").click(function(){
      var $this = $(this);
      $this.siblings().removeClass("active");
      $this.addClass("active");
      var target = $(document.getElementById($this.data("target")));
      target.siblings().hide();
      target.show();
    }); */
  }

  AuthorizeAgency = (success: boolean): void => {
    if (!success) {
      this.router.navigateByUrl('/');
      return;
    }

    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null || idToken.length == 0) {
      this.router.navigateByUrl('/');
      return;
    }

    let jwt: IdTokenJWT = jwt_decode(idToken as any);
    this.user = new User(jwt.nameid, jwt.unique_name);
  }

  BindProfile = (data: any): void => {
    if (data !== undefined && data != null) {
      this.userProfile.Email = data.email;
      this.userProfile.AvatarImage64 = data.avatarImage64 === undefined || data.avatarImage64 === null ? '/assets/img/sample-no-picture.png' : data.avatarImage64;
      this.userProfile.QRUidUrl = data.qrUidUrl;
      this.userProfile.QRImage64 = data.qrImage64 === undefined || data.qrImage64 === null ? '/assets/img/sample-no-picture.png' : data.qrImage64;

      $("#ModalProfile").modal();
    }
  }

  openProfile(): void {
    this.feraService.getProfile(this.BindProfile, true);
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
