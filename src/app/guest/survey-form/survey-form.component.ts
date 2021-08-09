import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  profileLang = '1';
  selectedValue: any;

  data = [
    {
      id: 1,
      name: 'English'
    },
    {
      id: 2,
      name: 'ML'
    }];
    selectLang() {
      this.selectedValue = this.profileLang;
  }

}
