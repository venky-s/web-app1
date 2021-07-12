import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeraService } from '../../../../service/fera.service';
import { FAQ } from '../../../../models/faq';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  list: FAQ[] = null;
  listCount: number = 0;
  addNewErrMsg: string;
  editErrMsg: string;
  faqDialogMsg: string;
  archiveId: number = 0;
  addNewForm = new FormGroup({
    question: new FormControl(null, [
      Validators.required
    ]),
    answer: new FormControl(null, [
      Validators.required
    ])
  });
  editForm = new FormGroup({
    id: new FormControl(0),
    question: new FormControl(null, [
      Validators.required
    ]),
    answer: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private feraService: FeraService) { }

  ngOnInit(): void {
    var $this = this;

    $('#content-head-menu li').removeClass('active');
    $('#content-head-menu li:nth-child(3)').addClass('active');

    $('#faqAddNew').on('hidden.bs.modal', function (e) {
      $this.addNewForm.patchValue({
        'question': null,
        'answer': null
      });
    });

    $('#faqEdit').on('hidden.bs.modal', function (e) {
      $this.editForm.patchValue({
        'id': 0,
        'question': null,
        'answer': null
      });
    });

    this.list = null;
    this.search();
  }

  activeList(): void {
    if (!$('*[data-faq-list="active"]').hasClass('active')) {
      $('*[data-faq-list]').removeClass('active');
      $('*[data-faq-list="active"]').addClass('active');
      this.list = null;
      this.search();
    }
  }

  archivedList(): void {
    if (!$('*[data-faq-list="archived"]').hasClass('active')) {
      $('*[data-faq-list]').removeClass('active');
      $('*[data-faq-list="archived"]').addClass('active');
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
    this.feraService.searchFAQ($('#searchKeywords').val(), $('*[data-faq-list="active"]').hasClass('active'), $('#sorting').children("option:selected").val(), this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.listCount = result.length;
      this.list = result;
    }
  }

  addNew(): void {
    $('#addNewErrMsg').hide();
    this.feraService.addFAQ(this.addNewForm.get('question').value, this.addNewForm.get('answer').value, this.addNewResult, true);
  }

  addNewResult = (success: boolean) => {
    if (success) {
      this.faqDialogMsg = 'Add success';
      $('#faqAddNew').modal('hide');
      this.search();
      $('#faqMessage').modal();
    }
    else {
      this.addNewErrMsg = 'Add failed!';
      $('#addNewErrMsg').show();
    }
  }

  edit(faq: FAQ): void {
    this.editForm.setValue({
      "id":faq.id,
      "question":faq.question,
      "answer":faq.answer
    });
    $('#faqEdit').modal();
  }

  update(): void {
    this.feraService.updateFAQ(this.editForm.get('id').value, this.editForm.get('question').value, this.editForm.get('answer').value, this.updateResult, true);
  }

  updateResult = (success: boolean) => {
    if (success) {
      this.faqDialogMsg = 'Update success';
      $('#faqEdit').modal('hide');
      this.editForm.setValue({
        "id":0,
        "question":'',
        "answer":''
      });
      this.search();
      $('#faqMessage').modal();
    }
    else {
      this.editErrMsg = 'Update failed!';
      $('#editErrMsg').show();
    }
  }

  archive(faq: FAQ): void {
    this.archiveId = faq.id;
    $('#faqConfirm').modal();
  }

  confirmArchive(id: number): void {
    $('#faqConfirm').modal('hide');
    this.feraService.archiveFAQ(id, this.archiveResult, true);
  }

  archiveResult = (success: boolean) => {
    if (success) {
      this.faqDialogMsg = 'Archived success.';
      this.search();
      $('#faqMessage').modal();
    }
    else {
      this.faqDialogMsg = 'Archive failed!';
      $('#faqMessage').show();
    }
  }
}
