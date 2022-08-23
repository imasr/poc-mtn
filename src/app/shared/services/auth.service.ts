import { Injectable } from '@angular/core';

export interface UserObject {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  attuid?: string;
  email?: string;
  middleName?: string;
  phone?: string;
  manageruid?: string;
  attEmail?: string;
  hrid?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userWorkflowDetail: any = {};

  constructor() {}

  public set setUserWorflow(v: string) {
    this.userWorkflowDetail = v;
  }

  public get getUserWorflow() {
    return this.userWorkflowDetail;
  }
}
