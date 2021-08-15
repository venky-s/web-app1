import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeraService } from '../../../../../service/fera.service';
import { Prospect, ProspectPaging } from '../../../../../models/Prospects';

@Component({
  selector: 'app-registered-prospect',
  templateUrl: './registered-prospect.component.html',
  styleUrls: ['./registered-prospect.component.css']
})
export class RegisteredProspectComponent implements OnInit {

  constructor(private router: Router, private  feraService: FeraService) { }
  prospectList: any = [];

  ngOnInit(): void {
      this.feraService.queryProspectByLeader('', 1, null, 1, 1, this.afterQuery, true);
  }

  afterQuery = (function(result: ProspectPaging) {
    if(result !=undefined && result !=null)
    {
      let response = result.result;
      response.forEach((elament) => {
        let newObj = {
          'branchId': elament.branchId,
          'branchName': elament.branchName,
          'email': elament.email,
          'hasMet': elament.hasMet,
          'id': elament.id,
          'leaderCode': elament.loaderCode,
          'leaderName': elament.loaderName,
          'mobileContact': elament.mobileContact,
          'name': elament.name,
          'profileStatusId': elament.profileStatusId,
          'profileStatusName': elament.profileStatusName,
          'recruiterCode': elament.recruiterCode,
          'recruiterName': elament.recruiterName,
          'regionId': elament.regionId,
          'regionName': elament.regionName,
          'registeredDate': elament.registeredDate,
          'statusId': elament.statusId,
          'statusName': elament.statusName
        
      }
        this.prospectList.push(newObj);
      });
      this.prospectList = result.result;
    }
    console.log('result', result);
    console.log('get Data', this.prospectList);

  }).bind(this);


  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    return newDate;   
  }

}
