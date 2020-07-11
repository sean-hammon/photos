import { takeUntil, filter } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { SessionStore } from './../store/session.store';
import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryProvider } from '@app/galleries';
import { Galleries } from '@app/galleries/gallery-data';
import { environment } from '@env';

interface GalleryLink {
  title: string;
  link: string[];
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public ancestors: GalleryLink[];
  public leaves: GalleryLink[];

  private unsub$: Subject<null>;
  private home: Gallery;

  constructor(
    private session: SessionStore,
  ) {
    this.home = Galleries[environment.homeGallery];
    this.ancestors = [{
      title: this.home.title,
      link: ['/']
    }];
  }

  ngOnInit(): void {
    console.log('breadcrumb.onInit');
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
      this.ancestors.push({
        title: gallery.title,
        link: ['/gallery', gallery.slug, gallery.hash]
      });
    } else {
      this.ancestors = [{
        title: this.home.title,
        link: ['/']
      }];
    }
    console.log(gallery.children);
    const children = gallery.children as Gallery[];
    this.leaves = children.map(c => {
      return {
        title: c.title,
        link: ['/gallery', c.slug, c.hash]
      };
    });
  }

}
