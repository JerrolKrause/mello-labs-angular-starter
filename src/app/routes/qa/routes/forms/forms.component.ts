import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public val = '';

  public options = [
    {
      label: 'Orange',
      value: 0,
    },
    {
      label: 'Apple',
      value: 1,
    },
    {
      label: 'Strawberry',
      value: 2,
    },
  ];

  public optionsStr = ['Orange', 'Apple', 'Strawberry'];

  public form = this.fb.group({
    text: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    email: [null, [Validators.required, Validators.email]],
    number: [
      null,
      [Validators.required, Validators.min(10), Validators.max(30)],
    ],
    password: [null, [Validators.required]],
    select: [null, [Validators.required]],
    select2: [null, [Validators.required]],
    textarea: [null, [Validators.required]],
    checkbox: [null, [Validators.required]],
    checkbox2: [null, [Validators.required]],
    radio: [null, [Validators.required]],
    radio2: [null, [Validators.required]],
    dropdown: [null, [Validators.required]],

    phoneNumber: [null, [Validators.required]],
    currency: [null, [Validators.required]],
    ssn: [null, [Validators.required]],
    date: [null, [Validators.required]],
    color: [null, [Validators.required]],
    toggle: [null, [Validators.required]],
    buttonGroup: [null, [Validators.required]],
    autoComplete: [null, [Validators.required]],
    autoComplete2: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(val => console.warn(val));
  }

  public patchData() {
    this.form.patchValue({
      text: 'TestTest',
      email: 'Test@test.com',
      number: 29,
      password: 'password',
      select: 2,
      select2: 'Orange',
      textarea: 'Hello World!!!',
      checkbox: [2],
      checkbox2: ['Apple'],
      radio: 2,
      radio2: 'Apple',
      dropdown: 2,
      phoneNumber: '5621231234',
      currency: 123234,
      ssn: '1231231234',
      date: '12/12/2020',
      color: '#cccccc',
      toggle: true,
      autoComplete: 1,
      autoComplete2: 'Apple',
    });
  }

  public onSubmit() {
    this.form.markAllAsTouched();
  }
}
