import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeraService } from '../../../../service/fera.service';
import { FileStage } from '../../../../models/FileStage';
import { ScriptGuide } from '../../../../models/ScriptGuide';
import { environment } from '../../../../environments/environment';
import { uploadFileValidator } from './upload-file.validator';

declare var $: any;

@Component({
  selector: 'app-script-guide-form',
  templateUrl: './script-guide-form.component.html',
  styleUrls: ['./script-guide-form.component.css']
})
export class ScriptGuideFormComponent implements OnInit {
  environment = environment;
  
  formTitle: string = '';
  formHeader: string = '';
  scriptGuideId: number = null;
  newScriptGuideId: number = null;
  scriptFormDialogMsg: string;
  scriptGuideForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl(null),
    businessChannel: new FormArray([], [
      Validators.required
    ]),
    language: new FormControl(null, [
      Validators.required
    ]),
    fileId: new FormControl(null),
    fileName: new FormControl(null),
    uploadedFileId: new FormControl(null),
    uploadedFileName: new FormControl(null)
  }, { validators: uploadFileValidator });

  constructor(private feraService: FeraService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.scriptGuideId = parseInt(this.route.snapshot.params['id']);
    if (this.scriptGuideId !== undefined && this.scriptGuideId !== null && this.scriptGuideId > 0) {
      this.formTitle = 'Edit Script Guide';
      this.feraService.getScriptGuide(this.scriptGuideId, this.afterInitScriptGuideId, true)
    }
    else {
      this.formTitle = 'Create New Script Guide';
    }

    $("input[type='checkbox'][name='business-channel']").change(function() {
      var $this = $(this);
      if ($this.is(':checked'))
        $this.parent().addClass('checked');
      else $this.parent().removeClass('checked');
    });

    $("input[type='radio'][name='language']").change(function() {
      var $this = $(this);
      $this.parent().siblings().removeClass('checked');
      if ($this.is(':checked'))
        $this.parent().addClass('checked');
    });
  }

  afterInitScriptGuideId = (scriptGuide: ScriptGuide): void => {
    if (scriptGuide === undefined || scriptGuide === null) {
      this.close(null);
      return;
    }

    this.scriptGuideForm.patchValue(
    {
      'title': scriptGuide.title,
      'description': scriptGuide.description,
      'businessChannel': [],
      'language': scriptGuide.languageId,
      'fileId': null,
      'fileName': null,
      'uploadedFileId': scriptGuide.fileId,
      'uploadedFileName': scriptGuide.fileName
    });

    var businessChannel = this.scriptGuideForm.get('businessChannel') as FormArray;

    for (var i = 0; i < scriptGuide.businessChannel.length; i++) {
      $("input[type='checkbox'][name='business-channel'][value='" + scriptGuide.businessChannel[i].key + "']").prop("checked", true);
      businessChannel.push(new FormControl(scriptGuide.businessChannel[i].key));
    }
    $("input[type='checkbox'][name='business-channel']").change();
    $("input[type='radio'][name='language'][value='" + scriptGuide.languageId + "']").prop( "checked", true );
    $("input[type='radio'][name='language'][value='" + scriptGuide.languageId + "']").parent().addClass('checked');
  }

  onChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var $this = $('#' + idAttr.nodeValue);

    var businessChannel = this.scriptGuideForm.get('businessChannel') as FormArray;
    
    if(event.target.checked) {
      businessChannel.push(new FormControl($this.val()));
    } 
    else {
      let index = businessChannel.controls.findIndex(x => x.value == $this.val())
      businessChannel.removeAt(index);
    }
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];

    if (file) {
      this.scriptGuideForm.patchValue(
      {
        'fileName': file.name
      });
      const formData = new FormData();
      formData.append("file", file);
      this.feraService.putFileInStage(formData, this.fileInStaged, true);
    }
  }

  fileInStaged = (fileStageInfo: FileStage): void => {
    if (fileStageInfo === undefined || fileStageInfo === null) {
      this.scriptGuideForm.patchValue(
      {
        'fileId': null,
        'fileName': null
      });
      return;
    }
    
    this.scriptGuideForm.patchValue(
    {
      'fileId': fileStageInfo.fileId,
      'fileName': fileStageInfo.fileName
    });
  }

  getFileName(): string {
    var fileName = '';
    if (this.scriptGuideForm === undefined || this.scriptGuideForm === null) {
      this.close(true);
      return fileName;
    }
    fileName = this.scriptGuideForm.get('fileName').value
    if (fileName === undefined || fileName === null || fileName.length == 0) {
      if (this.scriptGuideId !== undefined && this.scriptGuideId !== null && this.scriptGuideId > 0) {
        fileName = 'Upload another file.';
      }
      else fileName = 'No file uploaded yet.';
    }
    return fileName;
  }

  submit() {
    var businessChannel = this.scriptGuideForm.get('businessChannel') as FormArray;
    var businessChannelId = 0;
    for (var i = 0; i < businessChannel.controls.length; i++) {
      var control = businessChannel.controls[i] as FormControl;
      businessChannelId |= parseInt(control.value);
    }
    
    if (this.scriptGuideId === undefined || this.scriptGuideId === null || isNaN(this.scriptGuideId) || this.scriptGuideId <= 0) {
      this.feraService.addScriptGuide(
        this.scriptGuideForm.get('title').value,
        this.scriptGuideForm.get('description').value,
        businessChannelId,
        this.scriptGuideForm.get('language').value,
        this.scriptGuideForm.get('fileId').value,
        this.afterSubmit,
        true
      );
      return;
    }

    var fileId = this.scriptGuideForm.get('fileId').value;
    if (fileId === undefined || fileId === null || fileId.length == 0) {
      fileId = this.scriptGuideForm.get('uploadedFileId').value;
    }

    this.feraService.updateScriptGuide(
      this.scriptGuideId,
      this.scriptGuideForm.get('title').value,
      this.scriptGuideForm.get('description').value,
      businessChannelId,
      this.scriptGuideForm.get('language').value,
      fileId,
      this.afterSubmit,
      true
    );
  }

  afterSubmit = (id: number): void => {
    if (id !== undefined && id !== null) {
      if (this.scriptGuideId !== undefined && this.scriptGuideId !== null && this.scriptGuideId > 0) {
        this.scriptFormDialogMsg = 'Update success';
      }
      else {
        this.newScriptGuideId = id;
        this.scriptFormDialogMsg = 'Add success';
      }

      this.scriptGuideForm = new FormGroup({
        title: new FormControl(null),
        description: new FormControl(null),
        businessChannel: new FormArray([]),
        language: new FormControl(null),
        fileId: new FormControl(null),
        fileName: new FormControl(null),
        uploadedFileId: new FormControl(null),
        uploadedFileName: new FormControl(null)
      });

      $('#scriptFormMessage').modal();
    }
  }

  close(closeForm: boolean = false): void {
    this.scriptGuideForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      businessChannel: new FormArray([]),
      language: new FormControl(null),
      fileId: new FormControl(null),
      fileName: new FormControl(null),
      uploadedFileId: new FormControl(null),
      uploadedFileName: new FormControl(null)
    });

    if (closeForm) this.router.navigate(['/backoffice/content/script-guide']);

    if (this.newScriptGuideId !== undefined && this.newScriptGuideId !== null) this.router.navigate(['/backoffice/content/script-guide/' + this.newScriptGuideId]);
    else if (this.scriptGuideId !== undefined && this.scriptGuideId !== null) {
      this.ngOnInit();
    }
    else this.router.navigate(['/backoffice/content/script-guide']);
  }
}
