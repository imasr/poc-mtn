import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { emailValidator } from 'src/app/shared/utility/form-validator';
import { AddUser, LoggedInUser } from 'src/app/store/app.action';
import { User } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<{ usersList: { users: User[] } }>
  ) {}

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
      //ngrx
      this.store.dispatch(new LoggedInUser(this.loginForm.value));
      //session storage
      sessionStorage.setItem('user', JSON.stringify(this.loginForm.value));

      this.goToDashboard();
    } else console.log('invlaid form');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
