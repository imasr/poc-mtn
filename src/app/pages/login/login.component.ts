import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { emailValidator } from 'src/app/shared/utility/form-validator';
import { LoggedInUser } from 'src/app/store/app.action';
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

  ngOnInit(): void {
    this.autoLogin();
  }

  autoLogin() {
    let user: any = sessionStorage.getItem('user');
    user = user ? JSON.parse(user) : null;
    if (user?.email) {
      this.store.dispatch(new LoggedInUser(user));
      this.goToDashboard();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoggedInUser(this.loginForm.value));
      this.goToDashboard();
    } else console.log('invlaid form');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
