import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import {
  emailValidator,
  numberValidator,
} from 'src/app/shared/utility/form-validator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { downloadFile, resetForm } from 'src/app/shared/utility/utils';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userList: any[] = [];

  userColumn: any[] = [
    { field: 'id', displayName: 'Id' },
    { field: 'first_name', displayName: 'First Name' },
    { field: 'last_name', displayName: 'Last Name' },
    { field: 'avatar', displayName: 'Avatar' },
    { field: 'email', displayName: 'Email' },
  ];

  addUserForm = new FormGroup({
    id: new FormControl('', {
      validators: [Validators.required, numberValidator],
      updateOn: 'blur',
    }),
    first_name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    last_name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator],
      updateOn: 'blur',
    }),
    avatar: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  constructor(private apiService: ApiService, private user: AuthGuardService) {}

  get userEmail() {
    return this.user.logeddInUser.email || '';
  }

  updateValidator(field: string) {
    const field2 = field == 'last_name' ? 'first_name' : 'last_name';
    const v1 = this.addUserForm.get(field)?.value;
    const v2 = this.addUserForm.get(field2)?.value;
    if (!v1 && !v2) {
      this.addUserForm.get(field)?.setValidators([Validators.required]);
      this.addUserForm.get(field)?.setErrors({ required: true });
      this.addUserForm.get(field2)?.setValidators([Validators.required]);
      this.addUserForm.get(field2)?.setErrors({ required: true });
      this.addUserForm.updateValueAndValidity();
    } else {
      this.addUserForm.get(field)?.setValidators([Validators.required]);
      this.addUserForm.get(field)?.setErrors({ required: true });
      this.addUserForm.get(field2)?.clearValidators();
      this.addUserForm.get(field2)?.setErrors(null);
      this.addUserForm.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.apiService
      .get(`https://reqres.in/api/users`)
      .then((resp) => {
        this.userList = resp.data;
      })
      .catch((err) => console.error(err));
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      console.log(this.addUserForm.value);
      this.userList.push(this.addUserForm.value);
      resetForm(this.addUserForm);
      downloadFile(this.userList);
    } else console.log('invalid form');
  }
}
