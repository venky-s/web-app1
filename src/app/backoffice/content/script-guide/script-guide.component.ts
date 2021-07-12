import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
  
  list: ScriptGuide[] = null;
  listCount: number = 0;
  addNewErrMsg: string;
  editErrMsg: string;
  scriptDialogMsg: string;
  archiveId: number = 0;

  constructor(private feraService: FeraService, private route: Router) { }

  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(2)').addClass('active');
    this.list = null;
    this.search();
  }

  activeList(): void {
    if (!$('*[data-script-list="active"]').hasClass('active')) {
      $('*[data-script-list]').removeClass('active');
      $('*[data-script-list="active"]').addClass('active');
      this.list = null;
      this.search();
    }
  }

  archivedList(): void {
    if (!$('*[data-script-list="archived"]').hasClass('active')) {
      $('*[data-script-list]').removeClass('active');
      $('*[data-script-list="archived"]').addClass('active');
      this.list = null;
      this.search();
    }
  }

  onSearchTextChange(event): void {
    var $this = $("#searchKeywords");
    if ($this.val().length == 0) {
      $this.next().hide();
    }
    else $this.next().show();
  }

  clearSearthText(event): void {
    var $searchText = $("#searchKeywords");
    $searchText.val('');
    $searchText.next().hide();
  }

  search(): void {
    this.feraService.searchScriptGuide($('#searchKeywords').val(), $('#entity').children("option:selected").val(), $('#language').children("option:selected").val(), $('*[data-script-list="active"]').hasClass('active'), $('#sorting').children("option:selected").val(), this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.listCount = result.length;
      this.list = result;
    }
  }

  edit(scriptGuide: ScriptGuide): void {
    this.route.navigate(['/backoffice/content/script-guide/' + scriptGuide.id]);
  }

  archive(scriptGuide: ScriptGuide): void {
    this.archiveId = scriptGuide.id;
    $('#scriptConfirm').modal();
  }

  confirmArchive(id: number): void {
    $('#scriptConfirm').modal('hide');
    this.feraService.archiveScriptGuide(id, this.archiveResult, true);
  }

  archiveResult = (success: boolean) => {
    if (success) {
      this.scriptDialogMsg = 'Archived success.';
      this.search();
      $('#scriptMessage').modal();
    }
    else {
      this.scriptDialogMsg = 'Archive failed!';
      $('#scriptMessage').show();
    }
  }
}
