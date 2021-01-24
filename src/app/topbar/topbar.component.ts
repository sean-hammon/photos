import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';

import {  Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { SessionStore } from '@app/store/session.store';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  photoRoute = false;
  pageTitle: string;
  pageDescription: string;
  unsub$: Subject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.unsub$ = new Subject<boolean>();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.unsub$)
      )
      .subscribe((event: RouterEvent) => {
        const r = event.url.substr(1, 5);
        console.log(r);
        if (r === 'photo') {
          this.photoRoute = true;
        }
      });

    this.session.photo$
    .pipe(filter(photo => !!photo))
    .subscribe(p => {
      this.pageTitle = p.title;
      this.pageDescription = p.short_desc;
    });

    this.session.gallery$
    .pipe(filter(gallery => !!gallery))
    .subscribe(g => {
      this.pageTitle = g.title;
      this.pageDescription = g.description;
    });
  }

  ngOnDestroy() {
    this.unsub$.next(true);
    this.unsub$.complete();
  }

}
