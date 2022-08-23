import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utility/form-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, emailValidator],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    }),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else console.log('invlaid form');
  }
}
