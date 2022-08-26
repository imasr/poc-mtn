import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUsers } from 'src/app/store/app.action';
import { User } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allUsers: User[] = [];
  userEmail: any;

  constructor(
    private router: Router,
    private store: Store<{ usersList: { users: User[] } }>
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch(new GetUsers());
    this.store.select('usersList').subscribe(({ loggedInUser, users }: any) => {
      if (loggedInUser?.email && this.userEmail != loggedInUser.email) {
        this.userEmail = loggedInUser.email;
      }
      if (users) {
        this.allUsers = users;
      }
    });
  }

  createNewUser() {
    this.router.navigate(['/add-user']);
  }
}
