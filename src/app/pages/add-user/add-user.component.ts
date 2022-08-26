import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  emailValidator,
  numberValidator,
} from 'src/app/shared/utility/form-validator';
import { downloadFile, resetForm } from 'src/app/shared/utility/utils';
import { Store } from '@ngrx/store';
import { AddUser } from 'src/app/store/app.action';
import { User } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userList: User[] = [];

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
  userEmail: any;

  constructor(private store: Store<{ usersList: { users: User[] } }>) {}

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
    this.getUsers();
  }

  getUsers() {
    this.store.select('usersList').subscribe(({ loggedInUser, users }: any) => {
      this.userEmail = loggedInUser.email;
      if (loggedInUser?.email && this.userEmail != loggedInUser.email) {
        this.userEmail = loggedInUser.email;
      }
      if (users) {
        this.userList = users;
      }
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.store.dispatch(new AddUser(this.addUserForm.value));
      resetForm(this.addUserForm);
      downloadFile(this.userList);
    } else console.log('invalid form');
  }
}
