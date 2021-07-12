import { Component, OnInit } from '@angular/core';
import { FeraService } from '../../../../service/fera.service';
import { Byb } from '../../../../models/Byb';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-byb',
  templateUrl: './byb.component.html',
  styleUrls: ['./byb.component.css']
})
export class BybComponent implements OnInit {
  environment = environment;

  list: Byb[] = [];
  listCount: number = 0;

  constructor(private feraService: FeraService) { }

  ngOnInit(): void {
    $('#content-nav li a').removeClass('active');
    $('#content-nav li:nth-child(1) a').addClass('active');

    this.search();
  }

  search(): void {
    this.feraService.searchByb(null, null, $('#career-segment').children("option:selected").val(), true, $('#sorting').children("option:selected").val(), this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.listCount = result.length;
      this.list = result;
    }
  }

  getThumbnail(byb: Byb): string {
    if (byb.contentTypeId == 2) {
      return 'assets/img/no-thumbnail-video.png';
    }
    return byb.fileIdEN === undefined || byb.fileIdEN === null ? 'assets/img/no-thumbnail-file.png' : environment.feraApiPath + '/thumbnail/' + byb.fileIdEN
  }
}
