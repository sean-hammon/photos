import {Injectable} from '@angular/core';
import {fromEvent, Subject, timer} from 'rxjs';
import {debounce, takeUntil} from 'rxjs/operators';
import { Photo } from '@app/photos/photo.interface';
import {SafeStyle} from "@angular/platform-browser";

interface ImageStyles {
  backgroundImage: string;
  height: string;
  width: string;
  top?: string;
  left?: string;
  cursor?: string;
}

@Injectable({providedIn: 'root'})
export class PhotoUxHelper {

  private cancel$ = new Subject<boolean>();

  private initialX: number;
  private initialY: number;
  private initialTop: number;
  private initialLeft: number;
  private initialTransition: string;
  private minLeft: number;
  private dir: string;

  private sitePadding = 10;

  startDrag(dir: string, ev: MouseEvent) {

    this.dir = dir;

    fromEvent(document, 'mousemove')
      .pipe(
        debounce(() => timer(75)),
        takeUntil(this.cancel$)
      )
      .subscribe((mEvent) => this.constrainedDrag(ev));
  }

  stopDrag() {
    this.cancel$.next(true);
    this.cancel$.complete();
    this.cancel$ = new Subject<boolean>();

  }

  coverScreen(photo: Photo): SafeStyle {

    let imgRatio, viewRatio, top, left;

    const winH = document.documentElement.clientHeight - (this.sitePadding * 2);
    const winW = document.documentElement.clientWidth - (this.sitePadding * 2);

    const file = photo.photo;
    let imgH = file.height;
    let imgW = file.width;

    imgRatio = imgW / imgH;
    viewRatio = winW / winH;
    if (imgRatio > viewRatio) {
      //  Screen is longer than the photo, relative to the height.
      imgH = winH;
      imgW = Math.round(winH * imgRatio);

    } else {

      imgW = winW;
      imgH = Math.round(winW / imgRatio);

    }

    const styles: ImageStyles = {
      backgroundImage: `url(${file.url})`,
      height : `${imgH}px`,
      width: `${imgW}px`,
    };
    //  Landscape
    if ( imgRatio <= 1 ) {

      top = Math.round((winH - imgH) / 2);
      if (file.offset != null) {
        top = file.offset;
      }

      styles.top = `${top}px`;
      styles.cursor = 'ns-resize';
    }

    //  Portrait
    if (imgRatio > 1 ) {

      left = Math.round((winW - imgW) / 2);
      if (file.offset != null) {
        left = file.offset;
      }

      styles.left = `${left}px`;
      styles.cursor = 'ew-resize';

    }

    console.log(styles);
    return styles;
  }

  private constrainedDrag(event: MouseEvent) {
    console.log(event);
  }

}
