import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<{ usersList: { users: User[] } }>
  ) {}

  logeddInUser: { email?: string; password?: string } = {};

  canLoad() {
    return this.store.select('usersList').pipe(
      take(1),
      map(({ loggedInUser }: any) => {
        if (loggedInUser?.email) {
          this.logeddInUser = loggedInUser;
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
