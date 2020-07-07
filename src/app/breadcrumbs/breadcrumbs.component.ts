import { takeUntil, filter } from 'rxjs/operators';
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

  public ancestors: Gallery[];
  public leaves: Gallery[];

  private unsub$: Subject<null>;

  constructor(
    private session: SessionStore
  ) {
    this.ancestors = [];
  }

  ngOnInit(): void {
    this.unsub$ = new Subject();

    this.session.gallery$
      .pipe(
        takeUntil(this.unsub$),
        filter(gallery => !!gallery)
      )
      .subscribe(g => this.updateCrumbs(g));
  }

  updateCrumbs(gallery: Gallery) {
    if (!this.ancestors.length) {
      this.ancestors.push(gallery);
    }
    this.leaves = gallery.children as Gallery[];
  }

}
