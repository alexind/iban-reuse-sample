import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

interface Country {
  name: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup | any;
  countries: Array<Country> = [
    { name: 'USER VERIFIED', value: 'ON_BOARD' },
    { name: 'CAPTURED EID', value: 'CAPTURED_EID' },
    { name: 'FSS PROFILE UPDATED', value: 'FSS_PROFILE_UPDATED' },
    { name: 'CAPTURED ADDRESS', value: 'MEETING_SCHEDULED' },
    { name: 'BIRTH INFO COLLECTED', value: 'BIRTH_INFO_COLLECTED' },
    { name: 'FATCA GENERATED', value: 'FATCA_GENERATED' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      nrOfDays: new FormControl('', [Validators.required]),
      selectedCountries: new FormArray([]),
      file: new FormControl(''),
    });
  }

  onCheckboxChange(e: any) {
    const selectedCountries = this.form.controls[
      'selectedCountries'
    ] as FormArray;
    if (e.target.checked) {
      selectedCountries.push(new FormControl(e.target.value));
    } else {
      const index = selectedCountries.controls.findIndex(
        (x) => x.value === e.target.value
      );
      selectedCountries.removeAt(index);
    }
  }

  getFile(e: any) {
    this.form.controls['file'].setValue(e.target.files[0]);
  }

  submit() {
    console.log(this.form.value);
  }
}
