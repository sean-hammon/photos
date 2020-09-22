import {Injectable} from '@angular/core';
import {fromEvent, Subject, timer} from 'rxjs';
import {debounce, takeUntil} from 'rxjs/operators';
import { Photo } from '@app/photos/photo.interface';
import {SafeStyle} from '@angular/platform-browser';

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

  private target: HTMLElement;
  private initialX: number;
  private initialY: number;
  private initialTop: number;
  private initialLeft: number;
  private initialTransition: string;
  private minLeft: number;
  private minTop: number;
  private dir: string;

  private sitePadding = 10;

  startDrag(dir: string, ev: MouseEvent) {

    this.dir = dir;
    this.initialX = ev.pageX || ev.clientX;
    this.initialY = ev.pageY || ev.clientY;

    this.target = ev.target as HTMLElement;
    this.initialTransition = this.target.style.transition;
    this.target.style.transition = 'none';
    this.initialLeft = parseInt(this.target.style.left, 10);
    this.initialTop = parseInt(this.target.style.top, 10);

    let winH, winW;
    [winH, winW] = this.getWindowDimension();
    this.minLeft = winW - this.target.clientWidth;
    this.minTop = winH - this.target.clientHeight;

    fromEvent(document, 'mousemove')
      .pipe(
        debounce(() => timer(0, 75)),
        takeUntil(this.cancel$)
      )
      .subscribe((mEvent: MouseEvent) => this.constrainedDrag(mEvent));
  }

  stopDrag() {
    this.cancel$.next(true);
    this.cancel$.complete();
    this.cancel$ = new Subject<boolean>();
    this.target.style.transition = this.initialTransition;
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

    return styles;
  }

  private getWindowDimension() {
    return [
      document.documentElement.clientHeight - (this.sitePadding * 2),
      document.documentElement.clientWidth - (this.sitePadding * 2)
    ];
  }

  private constrainedDrag(event: MouseEvent) {
    if (this.dir === 'ns') {

      const currentY = event.pageY || event.clientY;
      const diff = this.initialY - currentY;

      let newTop = this.initialTop - diff;

      if (newTop > 0) {
        newTop = 0;
      } else if (newTop < this.minTop) {
        newTop = this.minTop;
      }

      this.target.style.top = newTop + 'px';

    } else {
      const currentX = event.pageX || event.clientX;
      const diff = this.initialX - currentX;

      let newLeft = this.initialLeft - diff;

      if (newLeft > 0) {
        newLeft = 0;
      } else if (newLeft < this.minLeft) {
        newLeft = this. minLeft;
      }

      this.target.style.left = newLeft + 'px';

    }
  }

}
