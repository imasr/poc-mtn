import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AddUsers } from 'src/app/store/app.action';
import { User } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allUsers: Observable<{ users: User[] }> | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private user: AuthGuardService,
    private store: Store<{ usersList: { users: User[] } }>
  ) {}

  get userEmail() {
    return this.user.logeddInUser.email || '';
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService
      .get(`https://reqres.in/api/users`)
      .then((resp) => {
        this.store.dispatch(new AddUsers(resp.data));
        this.allUsers = this.store.select('usersList');
      })
      .catch((err) => console.error(err));
  }

  createNewUser() {
    this.router.navigate(['/add-user']);
  }
}
