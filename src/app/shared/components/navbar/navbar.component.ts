import { Component, Input, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() header = '';
  constructor(private user: AuthGuardService) {}

  get loggedInEmail() {
    return this.user.logeddInUser.email || '';
  }

  ngOnInit(): void {}
}
