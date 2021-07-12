import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
  list: Byb[] = null;
  listCount: number = 0;
  addNewErrMsg: string;
  editErrMsg: string;
  bybDialogMsg: string;
  archiveId: number = 0;

  constructor(private feraService: FeraService, private route: Router) { }

  ngOnInit(): void {
    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(1)').addClass('active');
    this.list = null;
    this.search();
  }

  activeList(): void {
    if (!$('*[data-byb-list="active"]').hasClass('active')) {
      $('*[data-byb-list]').removeClass('active');
      $('*[data-byb-list="active"]').addClass('active');
      this.list = null;
      this.search();
    }
  }

  archivedList(): void {
    if (!$('*[data-byb-list="archived"]').hasClass('active')) {
      $('*[data-byb-list]').removeClass('active');
      $('*[data-byb-list="archived"]').addClass('active');
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
    this.feraService.searchByb($('#searchKeywords').val(), $('#entity').children("option:selected").val(), $('#career-segment').children("option:selected").val(), $('*[data-byb-list="active"]').hasClass('active'), $('#sorting').children("option:selected").val(), this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.listCount = result.length;
      this.list = result;
    }
  }

  edit(byb: Byb): void {
    this.route.navigate(['/backoffice/content/byb/' + byb.id]);
  }

  archive(byb: Byb): void {
    this.archiveId = byb.id;
    $('#bybConfirm').modal();
  }

  confirmArchive(id: number): void {
    $('#bybConfirm').modal('hide');
    this.feraService.archiveByb(id, this.archiveResult, true);
  }

  archiveResult = (success: boolean) => {
    if (success) {
      this.bybDialogMsg = 'Archived success.';
      this.search();
      $('#bybMessage').modal();
    }
    else {
      this.bybDialogMsg = 'Archive failed!';
      $('#bybMessage').show();
    }
  }

  getThumbnail(byb: Byb): string {
    if (byb.contentTypeId == 2) {
      return 'assets/img/no-thumbnail-video.png';
    }
    return byb.fileIdEN === undefined || byb.fileIdEN === null ? 'assets/img/no-thumbnail-file.png' : environment.feraApiPath + '/thumbnail/' + byb.fileIdEN
  }
}
