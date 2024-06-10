import { UntypedFormGroup, UntypedFormControl, AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(control: UntypedFormControl): { [key: string]: any } | null {
  // Regex pattern to validate email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the control value against the regex pattern
  const valid = emailRegex.test(control.value);

  // If the email is valid, return null (no error), otherwise return an object with the error key
  return valid ? null : { invalidEmail: true };
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}

export function duplicateEmail(myArray: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value)) &&
            myArray.some(e => e.email.trim().toLocaleLowerCase() === control.value.trim().toLocaleLowerCase())) {
            return { 'duplicateEmail': true };
        }
        return null;

    };
}

