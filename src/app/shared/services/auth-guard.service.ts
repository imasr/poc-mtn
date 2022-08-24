import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanLoad {
  constructor(private router: Router) {}

  logeddInUser: { email?: string; password?: string } = {};

  canLoad() {
    let user: any = sessionStorage.getItem('user');
    user = user ? JSON.parse(user) : null;
    if (user?.email) {
      this.logeddInUser = user;
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
