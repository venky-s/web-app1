import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeraService } from '../../../../service/fera.service';
import { ISurveyContact, SurveyContact } from '../../../../models/Survey';

@Component({
  selector: 'app-application-submitted',
  templateUrl: './application-submitted.component.html',
  styleUrls: ['./application-submitted.component.css']
})
export class ApplicationSubmittedComponent implements OnInit {
  contact: SurveyContact;

  constructor(private feraService: FeraService, private router: Router, private route: ActivatedRoute) {
    let refId = this.route.snapshot.params['refid'];
    if (refId === undefined || refId === null || refId.length == 0) {
      this.router.navigateByUrl('/');
      return;
    }

    this.feraService.getSurveyContact(refId, this.InitForm);
  }

  ngOnInit(): void { }

  InitForm = (result: ISurveyContact): void => {
    if (result === undefined || result === null) {
      this.contact = null;
      this.router.navigateByUrl('/');
      return;
    }
    
    this.contact = new SurveyContact(result.userCode, result.userName, result.mobileNo, result.email, result.avatarImage64);
  }
}
