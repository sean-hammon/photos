import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject, timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { Photo } from '@app/photos/photo.interface';
import { SafeStyle } from '@angular/platform-browser';
import {environment} from '@env';

interface ImageStyles {
  backgroundImage: string;
  height: string;
  width: string;
  top?: string;
  left?: string;
  cursor?: string;
}

@Injectable({ providedIn: 'root' })
export class PhotoUxHelper {

  public zoomActive$ = new BehaviorSubject<boolean>(false);
  public dragDir$ = new BehaviorSubject<string>('');

  private cancel$ = new Subject<boolean>();

  private target: HTMLElement;
  private initialX: number;
  private initialY: number;
  private initialTop: number;
  private initialLeft: number;
  private initialTransition: string;
  private minLeft: number;
  private minTop: number;
  private zoomState: string;

  private sitePadding = 10;

  startDrag(ev: MouseEvent) {

    const dir = this.dragDir$.getValue();
    this.initialX = ev.pageX || ev.clientX;
    this.initialY = ev.pageY || ev.clientY;

    this.target = ev.target as HTMLElement;
    this.initialTransition = this.target.style.transition;
    this.target.style.transition = 'none';
    this.initialLeft = parseInt(this.target.style.left, 10) || 0;
    this.initialTop = parseInt(this.target.style.top, 10) || 0;

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

    this.zoomActive$.next(false);
    this.dragDir$.next('');

    const winH = document.documentElement.clientHeight - (this.sitePadding * 2);
    const winW = document.documentElement.clientWidth - (this.sitePadding * 2);

    const file = photo.files.hifi;
    const href = environment.api
      + environment.imageRoot
      + file.path;
    let imgH = file.height;
    let imgW = file.width;

    imgRatio = imgW / imgH;
    viewRatio = winW / winH;
    if (imgRatio > viewRatio) {

      //  Screen is taller than the photo, relative to the width.

      imgH = winH;
      imgW = Math.round(winH * imgRatio);

    } else {

      //  Screen is wider than the photo, relative to the height.

      imgW = winW;
      imgH = Math.round(winW / imgRatio);

    }

    const styles: ImageStyles = {
      backgroundImage: `url(${href})`,
      height: `${imgH}px`,
      width: `${imgW}px`,
      top: '0',
      left: '0'
    };

    //  Landscape
    if (imgRatio > 1) {

      const center = Math.round((winW - imgW) / 2);
      if (file.offset != null) {
        left = - (imgW * file.offset / 100) + winW;
        if (left > 0) {
          left = 0;
        } else if (left < winW - imgW) {
          left = winW - imgW;
        }
      }

      styles.left = `${left}px`;
      styles.cursor = 'default';
      if (imgW - winW > 50) {
        styles.cursor = 'ew-resize';
        this.zoomActive$.next(true);
        this.dragDir$.next('ew');
      }
    }

    //  Portrait
    if (imgRatio <= 1) {

      const center = Math.round((winH - imgH) / 2);
      top = center / 2;
      if (file.offset != null) {
        top = - (imgH * file.offset / 100) + winH;
        if (top > 0) {
          top = 0;
        } else if (top < winH - imgH) {
          top = winH - imgH;
        }
      }

      styles.top = `${top}px`;
      styles.cursor = 'default';
      if (imgH - winH > 50) {
        styles.cursor = 'ns-resize';
        this.zoomActive$.next(true);
        this.dragDir$.next('ns');
      }

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
    const dir = this.dragDir$.getValue();
    if (dir === 'ns') {

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
        newLeft = this.minLeft;
      }

      this.target.style.left = newLeft + 'px';

    }
  }

}
