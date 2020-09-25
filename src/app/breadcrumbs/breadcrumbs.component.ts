import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionStore } from './../store/session.store';
import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryProvider } from '@app/galleries';
import { Galleries } from '@app/galleries/gallery-data';
import { environment } from '@env';

interface GalleryLink {
  title: string;
  hash: string;
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
    private galleryProvider: GalleryProvider
  ) {
    this.home = Galleries[environment.homeGallery];
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
    if (gallery.hash !== this.home.hash) {
      const inPath = this.ancestors.findIndex(g => g.hash === gallery.hash);
      if (this.ancestors.length > 0) {
        // Regular gallery navigation
        this.updateAncestors(gallery, inPath);
      } else {
        // Came here from a link
        this.rebuildAncestors(gallery);
      }
    } else {
      this.ancestors = [{
        title: this.home.title,
        hash: this.home.hash,
        link: ['/']
      }];
    }
    const children = gallery.children as Gallery[];
    this.leaves = children.map(c => {
      return {
        title: c.title,
        hash: c.hash,
        link: ['/gallery', c.slug, c.hash]
      };
    });
  }

  updateAncestors(gallery: Gallery, inPath: number) {

    // If the gallery was found remove it and any of
    // its children that might be in the ancestor array.

    if (inPath > 0) {
      this.ancestors = this.ancestors.slice(0, inPath);
    }

    // Now put it back in the ancestors array. Technically a bit
    // redudant since we could have modified inPath to not
    // remove it in the first place, but I like that this is more
    // explicit.

    this.ancestors.push({
      title: gallery.title,
      hash: gallery.hash,
      link: ['/gallery', gallery.slug, gallery.hash]
    });

  }

  rebuildAncestors(gallery: Gallery) {

    let g = { ...gallery };
    this.addAncestor(g);
    do {

      g = this.galleryProvider.getGallery(g.parent_id);
      this.addAncestor(g);

    } while (g.parent_id !== null);
  }

  addAncestor(gallery: Gallery) {
    const g = {
      title: gallery.title,
      hash: gallery.hash,
      link: ['/gallery', gallery.slug, gallery.hash]
    }
    this.ancestors.unshift(g);
  }


}
