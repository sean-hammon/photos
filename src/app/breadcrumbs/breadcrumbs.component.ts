import { takeUntil, filter } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { SessionStore } from './../store/session.store';
import { Component, OnInit } from '@angular/core';
import { Gallery } from '@app/galleries';
import { Galleries } from '@app/galleries/gallery-data';
import { environment } from '@env';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public ancestors: Gallery[];
  public leaves: Gallery[];

  private unsub$: Subject<null>;
  private home: Gallery;

  constructor(
    private session: SessionStore,
  ) {
    this.home = Galleries[environment.homeGallery];
    this.ancestors = [this.home];
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
    console.log(gallery);
    if (gallery.hash !== environment.homeGallery) {
      this.ancestors.push(gallery);
    } else {
      this.ancestors = [this.home];
    }
    this.leaves = gallery.children as Gallery[];
  }

}
