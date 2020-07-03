import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { SessionStore } from './../store/session.store';
import { Component, OnInit } from '@angular/core';
import { Gallery } from '../galleries/gallery.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  private unsub$: Subject<null>;

  constructor(
    private session: SessionStore
  ) { }

  ngOnInit(): void {
    this.unsub$ = new Subject();

    this.session.gallery$
      .pipe(takeUntil(this.unsub$))
      .subscribe(g => this.updateCrumbs(g));
  }

  updateCrumbs(gallery: Gallery) {

  }

}
