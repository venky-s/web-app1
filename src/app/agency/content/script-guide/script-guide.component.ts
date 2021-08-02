import { Component, OnInit } from '@angular/core';
import { FeraService } from '../../../../service/fera.service';
import { ScriptGuide } from '../../../../models/ScriptGuide';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-script-guide',
  templateUrl: './script-guide.component.html',
  styleUrls: ['./script-guide.component.css']
})
export class ScriptGuideComponent implements OnInit {
  environment = environment;

  list: ScriptGuide[] = [];
  listCount: number = 0;

  constructor(private feraService: FeraService) { }

  ngOnInit(): void {
    /*$('#content-nav li a').removeClass('active');
    $('#content-nav li:nth-child(2) a').addClass('active');
*/
    this.search();
  }

  search(): void {
    this.feraService.searchScriptGuide(null, null, null, true, $('#sorting').children("option:selected").val(), this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.listCount = result.length;
      this.list = result;
    }
  }
}
