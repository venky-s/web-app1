import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../fera.service';
import jwt_decode from 'jwt-decode';
import { User } from '../User';
import { IdTokenJWT } from '../IdTokenJWT';
import { ScriptService } from '../script.service'

declare var $: any;
declare var Unison: any;
declare var document: any;

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, AfterViewInit, OnDestroy {
  public user: User | undefined;

  constructor(private router: Router, private feraService: FeraService, private script: ScriptService) { }

  ngOnInit(): void {
    document.body.setAttribute('data-open', 'click');
    document.body.setAttribute('data-menu', 'vertical-menu');
    document.body.setAttribute('data-col', '2-columns');
    document.body.classList.add('vertical-layout', 'vertical-menu', '2-columns', 'fixed-navbar');
    
    this.script.load('app').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this.feraService.getAuthorizeBackoffice(this.AuthorizeBackoffice);
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

  ngAfterViewInit(): void {
    var $html = $('html');
    
    var rtl;
    if($('html').data('textdirection') == 'rtl'){
        rtl = true;
    }

    setTimeout(function(){
        $html.removeClass('loading').addClass('loaded');
    }, 1200);

    $.app.menu.init();

    if($.app.nav.initialized === false){
      // Navigation configurations
      var config = {
          speed: 300 // set speed to expand / collpase menu
      };
      $.app.nav.init(config);
    }

    Unison.on('change', function() {
        $.app.menu.change();
    });

    // Tooltip Initialization
    $('[data-toggle="tooltip"]').tooltip({
        container:'body'
    });

    // Add open class to parent list item if subitem is active except compact menu
    var menuType = $('#dashboard').data('menu');
    if(menuType != 'vertical-compact-menu' && menuType != 'horizontal-menu' && menuType != 'horizontal-top-icon-menu'){
        $(".main-menu-content").find('li.active').parents('li').addClass('open');
    }
    if(menuType == 'vertical-compact-menu' || menuType == 'horizontal-menu' || menuType == 'horizontal-top-icon-menu'){
        $(".main-menu-content").find('li.active').parents('li:not(.nav-item)').addClass('open');
        $(".main-menu-content").find('li.active').parents('li').addClass('active');
    }
  }

  ngOnDestroy(): void {
    document.body.removeAttribute('data-open');
    document.body.removeAttribute('data-menu');
    document.body.removeAttribute('data-col');
    let classList = document.body.classList;
    while (classList.length > 0) {
      classList.remove(classList.item(0));
    }
  }

  logout(event: MouseEvent) {
    let idToken = sessionStorage.getItem("idToken");
    if (idToken !== undefined && idToken !== null) {
      sessionStorage.removeItem("idToken");
    }
    this.router.navigateByUrl('/');
  }
}
