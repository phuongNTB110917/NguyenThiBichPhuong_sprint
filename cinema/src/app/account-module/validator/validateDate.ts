import {AbstractControl, FormControl} from '@angular/forms';

export function validateDate(control: AbstractControl) {
  if (control.value === '') {
    return null;
  }
  const dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;
  if (!dateRegex.test(control.value)) {
    return {formatDateOfBirthInvalid: true};
  }

  const currentDate: Date = new Date();
  const dateOfBirth = new Date(control.value);

  const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  if (age >= 12 && age <= 80) {
    return null;
  }
  return {ageInvalid : true};
}

export function checkValidDate(control: AbstractControl) {
  if (control.value === '') {
    return null;
  }

  const dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;
  if (!dateRegex.test(control.value)) {
    return {formatDateOfBirthInvalid: true};
  }
}
