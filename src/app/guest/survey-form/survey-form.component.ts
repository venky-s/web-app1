import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'bm']);
    translate.setDefaultLang('en');
   }

   
  ngOnInit(): void {
  }
   

  profileLang = 'en';
  //selectedValue: any;

  data = [
    {
      id: 'en',
      name: 'English'
    },
    {
      id: 'bm',
      name: 'BM'
    }];
    selectLang() {
      //this.selectedValue = this.profileLang;
      //translate.use(this.profileLang);
  }

}
