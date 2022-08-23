import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employeesColumns: any[] = [
    { field: 'id' },
    { field: 'employee_name' },
    { field: 'Doris Wilder' },
    { field: 'employee_salary' },
    { field: 'employee_age' },
    { field: 'profile_image' },
  ];
  employees: any;
  allUsers: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getEmployees();
  }
  getEmployees() {
    this.apiService
      .get('https://dummy.restapiexample.com/api/v1/employees')
      .then(({ data }) => {
        this.employees = data;
      })
      .catch((err) => console.error(err));
  }

  getUsers(page = 1) {
    this.apiService
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((resp) => {
        this.allUsers = resp.data;
      })
      .catch((err) => console.error(err));
  }
}
