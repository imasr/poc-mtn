import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthGuardService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allUsers: {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  }[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService
      .get(`https://reqres.in/api/users`)
      .then((resp) => {
        this.allUsers = resp.data;
      })
      .catch((err) => console.error(err));
  }

  createNewUser() {
    this.router.navigate(['/add-user']);
  }
}
