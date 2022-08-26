import { UserActions, UserActionTypes } from './app.action';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  password: string;
}

export interface UserState {
  users: User[];
}

const initialUserState = {
  users: [],
  loggedInUser: null,
};

export function UserReducer(state = initialUserState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.GETUSERS:
      return {
        ...state,
        users: [],
        authError: null,
      };
    case UserActionTypes.GETUSERSFAILED:
      return {
        ...state,
        users: [],
        authError: action.payload,
      };
    case UserActionTypes.ADDUSER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UserActionTypes.ADDUSERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };

    case UserActionTypes.USERLOGIN:
      sessionStorage.setItem('user', JSON.stringify(action.payload));

      return {
        ...state,
        loggedInUser: action.payload,
      };

    default:
      return state;
  }
}

export const reducers: any = {
  usersList: UserReducer,
};
