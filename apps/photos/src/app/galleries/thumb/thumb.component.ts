import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Photo } from '@ui/photos';
import { Router } from '@angular/router';

import { environment } from '@uenv';
import { fadeAnimation } from '@ui/fade.animation';
import { SessionStore } from '@ui/store/session.store';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css'],
  animations: [fadeAnimation],
})
export class ThumbComponent implements OnInit, AfterViewInit {
  title: string;
  route: string[];
  loading: boolean;
  fadeState: string;

  @Input() item: Photo;
  @ViewChild('thumb') thumb: ElementRef;

  @HostListener('click') thumbClick(event) {
    this.router.navigate(this.route);
  }

  constructor(private router: Router, private session: SessionStore) {
    this.loading = true;
    this.fadeState = 'hidden';
  }

  ngOnInit(): void {
    this.title = this.item.title;
    this.route = this.item.route;
    this.route.unshift(this.session.rootPath$.getValue());
  }

  ngAfterViewInit(): void {
    const href =
      environment.api + environment.imageRoot + this.item.files.thumb.path;
    const img = new Image();
    img.onload = () => {
      this.loading = false;
      this.fadeState = 'visible';
      this.thumb.nativeElement.style.backgroundImage = `url(${href})`;
    };
    img.onerror = (err: ErrorEvent) => {
      console.log(img.src + ' failed: ' + err.message);
    };
    img.src = href;
  }
}
