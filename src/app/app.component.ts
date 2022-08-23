import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'poc';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.activatedRoute.snapshot.root);
        this.titleService.setTitle(title);
      }
    });
  }

  private getTitle(
    routerSnapShot: ActivatedRouteSnapshot,
    title: string = ''
  ): string {
    title =
      routerSnapShot.data && routerSnapShot.data['title']
        ? routerSnapShot.data['title']
        : title;
    if (routerSnapShot.firstChild) {
      title = this.getTitle(routerSnapShot.firstChild, title);
    }
    return title;
  }
}
