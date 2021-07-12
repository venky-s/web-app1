import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FeraService } from '../../../../service/fera.service';
import { FileStage } from '../../../../models/FileStage';
import { Byb } from '../../../../models/Byb';
import { environment } from '../../../../environments/environment';
import { uploadFileEnValidator } from './upload-file-en.validator';

declare var $: any;

@Component({
  selector: 'app-byb-form',
  templateUrl: './byb-form.component.html',
  styleUrls: ['./byb-form.component.css']
})
export class BybFormComponent implements OnInit {
  environment = environment;

  formTitle: string = '';
  formHeader: string = '';
  bybContentId: number = null;
  newBybContentId: number = null;
  bybFormDialogMsg: string;
  bybForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl(null),
    businessChannel: new FormArray([], [
      Validators.required
    ]),
    contentType: new FormControl(null, [
      Validators.required
    ]),
    careerSegment: new FormControl(null, [
      Validators.required
    ]),
    fileIdEN: new FormControl(null),
    fileNameEN: new FormControl(null),
    uploadedFileIdEN: new FormControl(null),
    uploadedFileNameEN: new FormControl(null),
    enUrl: new FormControl(null),
    fileIdMS: new FormControl(null),
    fileNameMS: new FormControl(null),
    uploadedFileIdMS: new FormControl(null),
    uploadedFileNameMS: new FormControl(null),
    msUrl: new FormControl(null),
  }, { validators: uploadFileEnValidator});

  constructor(private feraService: FeraService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bybContentId = parseInt(this.route.snapshot.params['id']);
    if (this.bybContentId !== undefined && this.bybContentId !== null && this.bybContentId > 0) {
      this.formTitle = 'Edit BYB Content';
      this.feraService.getByb(this.bybContentId, this.afterInitBybContentId, true)
    }
    else {
      this.formTitle = 'Create New BYB Content';
    }

    $("input[type='radio'][name='contentType']").change(function() {
      var $ele = $(this);
      var $parent = $ele.closest("li");
      $parent.siblings().removeClass('active');
      if ($ele.is(':checked')) {
        $parent.addClass('active');
        var target = $(document.getElementById($parent.data("target")));
        target.siblings().hide();
        target.show();
      }
    });

    var $radFile = $("#radFile");
    $radFile.prop("checked", true);
    this.bybForm.patchValue({'contentType': $radFile.val()});
    $radFile.change();

    $("input[type='checkbox'][name='business-channel']").change(function() {
      var $ele = $(this);
      if ($ele.is(':checked'))
        $ele.parent().addClass('checked');
      else $ele.parent().removeClass('checked');
    });

    $("input[type='radio'][name='careerSegment']").change(function() {
      var $ele = $(this);
      $ele.parent().siblings().removeClass('checked');
      if ($ele.is(':checked'))
        $ele.parent().addClass('checked');
    });

    var $this = this;
    $("#tabSwitch > li").click(function(){
      var $cbx = $(this).find("input[type=radio]");
      $cbx.prop("checked", true);
      $this.bybForm.patchValue({
        'contentType': $cbx.val()
      });
      if (this.bybContentId === null) {
        $this.bybForm.patchValue({
          'contentType': $cbx.val(),
          'fileIdEN': null,
          'fileNameEN': null,
          'enUrl': null,
          'fileIdMS': null,
          'fileNameMS': null,
          'msUrl': null
        });
      }
      $cbx.change();
    });
  }

  afterInitBybContentId = (byb: Byb): void => {
    if (byb === undefined || byb === null) {
      this.close(null);
      return;
    }
    
    this.bybForm.patchValue(
    {
      'title': byb.title,
      'description': byb.description,
      'businessChannel': [],
      'contentType': byb.contentTypeId,
      'careerSegment': byb.careerSegmentId,
      'fileIdEN': null,
      'fileNameEN': null,
      'enUrl': byb.filePathEN,
      'fileIdMS': null,
      'fileNameMS': null,
      'msUrl': byb.filePathMS,
      'uploadedFileIdEN': byb.fileIdEN,
      'uploadedFileNameEN': byb.fileNameEN,
      'uploadedFileIdMS': byb.fileIdMS,
      'uploadedFileNameMS': byb.fileNameMS
    });

    var businessChannel = this.bybForm.get('businessChannel') as FormArray;

    for (var i = 0; i < byb.businessChannel.length; i++) {
      $("input[type='checkbox'][name='business-channel'][value='" + byb.businessChannel[i].key + "']").prop("checked", true);
      businessChannel.push(new FormControl(byb.businessChannel[i].key));
    }
    $("input[type='checkbox'][name='business-channel']").change();
    
    var $contentType = $("input[type='radio'][name='contentType'][value='" + byb.contentTypeId + "']");
    $contentType.prop("checked", true);
    $contentType.change();

    var $careerSegment = $("input[type='radio'][name='careerSegment'][value='" + byb.careerSegmentId + "']")
    $careerSegment.prop("checked", true);
    $careerSegment.change();
  }

  onChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var $this = $('#' + idAttr.nodeValue);

    var businessChannel = this.bybForm.get('businessChannel') as FormArray;
    
    if(event.target.checked) {
      businessChannel.push(new FormControl($this.val()));
    } 
    else {
      let index = businessChannel.controls.findIndex(x => x.value == $this.val())
      businessChannel.removeAt(index);
    }
  }

  onFileENSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.bybForm.patchValue(
      {
        'fileNameEN': file.name
      });
      const formData = new FormData();
      formData.append("file", file);
      this.feraService.putFileInStage(formData, this.fileENInStaged, true);
    }
  }

  fileENInStaged = (fileStageInfo: FileStage): void => {
    if (fileStageInfo === undefined || fileStageInfo === null) {
      this.bybForm.patchValue(
      {
        'fileIdEN': null,
        'fileNameEN': null
      });
      return;
    }
    
    this.bybForm.patchValue(
    {
      'fileIdEN': fileStageInfo.fileId,
      'fileNameEN': fileStageInfo.fileName
    });
  }

  onFileMSSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.bybForm.patchValue(
      {
        'fileNameMS': file.name
      });
      const formData = new FormData();
      formData.append("file", file);
      this.feraService.putFileInStage(formData, this.fileMSInStaged, true);
    }
  }

  fileMSInStaged = (fileStageInfo: FileStage): void => {
    if (fileStageInfo === undefined || fileStageInfo === null) {
      this.bybForm.patchValue(
      {
        'fileIdMS': null,
        'fileNameMS': null
      });
      return;
    }
    
    this.bybForm.patchValue(
    {
      'fileIdMS': fileStageInfo.fileId,
      'fileNameMS': fileStageInfo.fileName
    });
  }

  getFileNameEN(): string {
    var fileName = '';
    if (this.bybForm === undefined || this.bybForm === null) {
      this.close(true);
      return fileName;
    }
    fileName = this.bybForm.get('fileNameEN').value
    if (fileName === undefined || fileName === null || fileName.length == 0) {
      if (this.bybContentId !== undefined && this.bybContentId !== null && this.bybContentId > 0) {
        fileName = 'Upload another file.';
      }
      else fileName = 'No file uploaded yet.';
    }
    return fileName;
  }

  getFileNameMS(): string {
    var fileName = '';
    if (this.bybForm === undefined || this.bybForm === null) {
      this.close(true);
      return fileName;
    }
    fileName = this.bybForm.get('fileNameMS').value
    if (fileName === undefined || fileName === null || fileName.length == 0) {
      if (this.bybContentId !== undefined && this.bybContentId !== null && this.bybContentId > 0) {
        fileName = 'Upload another file.';
      }
      else fileName = 'No file uploaded yet.';
    }
    return fileName;
  }

  submit() {
    var businessChannel = this.bybForm.get('businessChannel') as FormArray;
    var businessChannelId = 0;
    for (var i = 0; i < businessChannel.controls.length; i++) {
      var control = businessChannel.controls[i] as FormControl;
      businessChannelId |= parseInt(control.value);
    }
    
    if (this.bybContentId === undefined || this.bybContentId === null || isNaN(this.bybContentId) || this.bybContentId <= 0) {
      this.feraService.addByb(
        this.bybForm.get('title').value,
        this.bybForm.get('description').value,
        businessChannelId,
        this.bybForm.get('contentType').value,
        this.bybForm.get('careerSegment').value,
        this.bybForm.get('fileIdEN').value,
        this.bybForm.get('enUrl').value,
        this.bybForm.get('fileIdMS').value,
        this.bybForm.get('msUrl').value,
        this.afterSubmit,
        true
      );
      return;
    }

    var fileIdEN = this.bybForm.get('fileIdEN').value;
    if (fileIdEN === undefined || fileIdEN === null || fileIdEN.length == 0) {
      fileIdEN = this.bybForm.get('uploadedFileIdEN').value;
    }

    var fileIdMS = this.bybForm.get('fileIdMS').value;
    if (fileIdMS === undefined || fileIdMS === null || fileIdMS.length == 0) {
      fileIdMS = this.bybForm.get('uploadedFileIdMS').value;
    }

    this.feraService.updateByb(
      this.bybContentId,
      this.bybForm.get('title').value,
      this.bybForm.get('description').value,
      businessChannelId,
      this.bybForm.get('contentType').value,
      this.bybForm.get('careerSegment').value,
      fileIdEN,
      this.bybForm.get('enUrl').value,
      fileIdMS,
      this.bybForm.get('msUrl').value,
      this.afterSubmit,
      true
    );
  }

  afterSubmit = (id: number): void => {
    if (id !== undefined && id !== null) {
      if (this.bybContentId !== undefined && this.bybContentId !== null && this.bybContentId > 0) {
        this.bybFormDialogMsg = 'Update success';
      }
      else {
        this.newBybContentId = id;
        this.bybFormDialogMsg = 'Add success';
      }

      this.bybForm = new FormGroup({
        title: new FormControl(null),
        description: new FormControl(null),
        businessChannel: new FormArray([]),
        contentType: new FormControl(null),
        careerSegment: new FormControl(null),
        fileIdEN: new FormControl(null),
        fileNameEN: new FormControl(null),
        uploadedFileIdEN: new FormControl(null),
        uploadedFileNameEN: new FormControl(null),
        enUrl: new FormControl(null),
        fileIdMS: new FormControl(null),
        fileNameMS: new FormControl(null),
        uploadedFileIdMS: new FormControl(null),
        uploadedFileNameMS: new FormControl(null),
        msUrl: new FormControl(null),
      });

      $('#bybFormMessage').modal();
    }
  }

  close(closeForm: boolean = false): void {

    this.bybForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      businessChannel: new FormArray([]),
      contentType: new FormControl(null),
      careerSegment: new FormControl(null),
      fileIdEN: new FormControl(null),
      fileNameEN: new FormControl(null),
      uploadedFileIdEN: new FormControl(null),
      uploadedFileNameEN: new FormControl(null),
      enUrl: new FormControl(null),
      fileIdMS: new FormControl(null),
      fileNameMS: new FormControl(null),
      uploadedFileIdMS: new FormControl(null),
      uploadedFileNameMS: new FormControl(null),
      msUrl: new FormControl(null),
    });

    if (closeForm) this.router.navigate(['/backoffice/content/byb']);

    if (this.newBybContentId !== undefined && this.newBybContentId !== null) this.router.navigate(['/backoffice/content/byb/' + this.newBybContentId]);
    else if (this.bybContentId !== undefined && this.bybContentId !== null) {
      this.ngOnInit();
    }
    else this.router.navigate(['/backoffice/content/byb']);
  }
}
