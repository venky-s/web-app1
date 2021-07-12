import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../service/fera.service';
import jwt_decode from 'jwt-decode';
import { User } from '../../models/User';
import { IdTokenJWT } from '../../models/IdTokenJWT';
import { SessionService } from '../../service/session.service'

declare var $: any;

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {
  public user: User | undefined;

  constructor(private router: Router, private feraService: FeraService, private session: SessionService) { }

  ngOnInit(): void {
    //this.feraService.getAuthorizeBackoffice(this.AuthorizeBackoffice, true);
    let jwt: IdTokenJWT = {nameid: "100", unique_name: "Test User", role: "Dev"}
    this.user = new User("100", "Test User");

    $('#sidebarCollapse').on('click', function () {
      $('#menuClose').toggle();
      $('#menuClose').css({left: '295px'});
      $('#sidebar').toggleClass('active');
      $('.fix-center').toggle();
    });

    $('#menuClose').on('click', function () {
      $('#menuClose').css({left: '0px'});
      $('#menuClose').toggle();
      $('.fix-center').toggle();
      $('#sidebar').toggleClass('active');
    });

    var resizeTimer;
    $(window).resize(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
          if ($('#sidebar').width() > 300) {
            $('#menuClose').hide();
            $('.fix-center').hide();
            $('#sidebar').removeClass('active');
          }
          else {
            if (!$('#sidebar').hasClass('active')) {
              $('.fix-center').show();
            }
          }
        }, 200);
    });
    // $('[data-class]').click(function () {
    //   this.UpdateNavbarClass($(this).attr('data-class'));
    // });

    // this.UpdateNavbarClass('fixed-left');
  }

  UpdateNavbarClass(className) {
    $('nav')
      .removeClass(function (index, css) {
        return (css.match(/(^|\s)fixed-\S+/g) || []).join(' ');
      })
      .addClass(className);

    $('[data-class]').removeClass('active').parent('li').removeClass('active');
    $('[data-class="' + className + '"]').addClass('active').parent('li').addClass('active');

    this.FixBodyMargin(className);
  }

  FixBodyMargin(className) {
    if (/fixed-(left|right)/.test(className)) {
      $('body').removeAttr('style');
      if (className === 'fixed-right') {
        $('body').css('marginLeft', 0);
      } else {
        $('body').css('marginRight', 0);
      }
    } else {
      $('body').css({
        "margin-right": 0,
        "margin-left": 0,
        "padding-top": '90px'
      });
    }
  }

  AuthorizeBackoffice = (success: boolean): void => {
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

  logout(event: MouseEvent): void {
    this.session.logout();
  }
}
