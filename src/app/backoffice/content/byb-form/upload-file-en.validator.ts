import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const uploadFileEnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const fileIdEN = control.get('fileIdEN').value;
    const uploadedFileIdEN = control.get('uploadedFileIdEN').value;
    const enUrl = control.get('enUrl').value;
  
    return fileIdEN !== null || uploadedFileIdEN !== null || enUrl !== null ? null : { fileEnRequired: true };
};