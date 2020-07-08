import { SessionStore } from '@app/store/session.store';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  pageTitle: string;
  pageDescription: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionStore
  ) { }

  ngOnInit(): void {

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

}
