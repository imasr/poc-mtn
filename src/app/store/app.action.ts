import { Action } from '@ngrx/store';
import { User } from './app.reducer';

export enum UserActionTypes {
  ADDUSER = 'ADDUSER',
  ADDUSERS = 'ADDUSERS',
  USERLOGIN = 'USERLOGIN',
}

export class AddUser implements Action {
  readonly type = UserActionTypes.ADDUSER;

  constructor(public payload: User[]) {}
}
export class AddUsers implements Action {
  readonly type = UserActionTypes.ADDUSERS;

  constructor(public payload: User[]) {}
}

export class LoggedInUser implements Action {
  readonly type = UserActionTypes.USERLOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export type UserActions = AddUser | AddUsers | LoggedInUser;
