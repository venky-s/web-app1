import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const uploadFileValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fileId = control.get('fileId').value;
    const uploadedFileId = control.get('uploadedFileId').value;
  
    return fileId !== null || uploadedFileId !== null ? null : { fileRequired: true };
};