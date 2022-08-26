import { Action } from '@ngrx/store';
import { User } from './app.reducer';

export enum UserActionTypes {
  USERLOGIN = 'USERLOGIN',
  GETUSERS = 'GETUSERS',
  GETUSERSFAILED = 'GETUSERSFAILED',
  ADDUSER = 'ADDUSER',
  ADDUSERS = 'ADDUSERS',
}

export class LoggedInUser implements Action {
  readonly type = UserActionTypes.USERLOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.GETUSERS;
  public payload: any;
}

export class GetUsersFailed implements Action {
  readonly type = UserActionTypes.GETUSERSFAILED;

  constructor(public payload: any) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.ADDUSER;

  constructor(public payload: User[]) {}
}

export class AddUsers implements Action {
  readonly type = UserActionTypes.ADDUSERS;

  constructor(public payload: User[]) {}
}

export type UserActions =
  | AddUser
  | AddUsers
  | LoggedInUser
  | GetUsers
  | GetUsersFailed;
