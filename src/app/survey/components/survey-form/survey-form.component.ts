import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';
import { FeraService } from '../../../../service/fera.service';
import { QRId, QRIdInfo } from '../../../../models/User';
import { QuestionAnswer, ISurveyResponse } from '../../../../models/Survey';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyForm = new FormGroup({
    question1: new FormControl(null, Validators.required),
    question2: new FormControl(null, Validators.required),
    question3: new FormControl(null, Validators.required),
    question4: new FormControl(null, Validators.required),
    question5: new FormControl(null, Validators.required),
    question6: new FormControl(null, Validators.required),
    question7: new FormControl(null, Validators.required),
    inputName: new FormControl(null, Validators.required),
    inputMobileArea: new FormControl(null, Validators.required),
    inputMobileNo: new FormControl(null, Validators.required),
    inputEmail: new FormControl(null, Validators.required),
    inputVehicle: new FormControl(null, Validators.required)
  });

  QRIdInfo: QRIdInfo;

  profileLang = 'en';

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
  }

  constructor(private router: Router, private feraService: FeraService, public translate: TranslateService) {
    translate.addLangs(['en', 'bm']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    var $this = this;
    this.QRIdInfo = new QRIdInfo(null, null, null);

    window.onload = function() {
      var params = new URLSearchParams(location.search);

      let qrid = params.get('qr');
      if (qrid === undefined || qrid === null || qrid.length == 0) {
        $this.router.navigateByUrl('/');
        return;
      }

      $this.QRIdInfo.qrId = qrid;
      $this.feraService.getQRId(qrid, $this.InitForm);
    };
  }

  InitForm = (qrId: QRId): void => {
    if (qrId === undefined || qrId === null) {
      this.QRIdInfo.qrId = null;
      this.router.navigateByUrl('/');
      return;
    }
    
    this.QRIdInfo.userName = qrId.userName;
    this.QRIdInfo.avatarImage64 = qrId.avatarImage64;
  }
  
  continue(event) {
    event.preventDefault();
    if ($('#home').hasClass('active'))
      $('#home').removeClass('active');
    $('#profile').tab('show');
  }

  back(event) {
    event.preventDefault();
    if ($('#profile').hasClass('active'))
      $('#profile').removeClass('active');
    $('#home').tab('show');
  }

  submit() {
    var qa: QuestionAnswer[] = [
      new QuestionAnswer(1, this.surveyForm.get('question1').value),
      new QuestionAnswer(2, this.surveyForm.get('question2').value),
      new QuestionAnswer(3, this.surveyForm.get('question3').value),
      new QuestionAnswer(4, this.surveyForm.get('question4').value),
      new QuestionAnswer(5, this.surveyForm.get('question5').value),
      new QuestionAnswer(6, this.surveyForm.get('question6').value),
      new QuestionAnswer(7, this.surveyForm.get('question7').value)
    ]

    var afterSubmit = (function(result: ISurveyResponse) {
      if (result === undefined || result === null || result.refId === undefined || result.refId === null || result.refId.length == 0)
      {
        alert("Fail!");
        return;
      }

      if ($('#profile').hasClass('active'))
        $('#profile').removeClass('active');
      
      $('#home').tab('show');   

      this.surveyForm.reset();

      this.router.navigate(['/survey/submitted/' + result.refId]);
    }).bind(this);

    this.feraService.submitSurvey(
      this.QRIdInfo.qrId,
      this.surveyForm.get('inputName').value,
      this.surveyForm.get('inputMobileArea').value + this.surveyForm.get('inputMobileNo').value,
      this.surveyForm.get('inputEmail').value,
      this.surveyForm.get('inputVehicle').value,
      qa,
      afterSubmit
    );
  }
}
