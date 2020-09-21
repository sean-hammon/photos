import {Injectable} from '@angular/core';
import {fromEvent, Subject, timer} from 'rxjs';
import {debounce, subscribeOn, takeUntil} from 'rxjs/operators';
import { Photo } from '@app/photos/photo.interface';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class PhotoUxHelper {

  private cancel$ = new Subject<boolean>();

  private initialX: number;
  private initialY: number;
  private initialTop: number;
  private initialLeft: number;
  private initialTransition: string;
  private minTop: number;
  private minLeft: number;
  private dir: string;
  private target: HTMLElement;

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

  constrainedDrag(event: MouseEvent) {
    console.log(event);
  }

}
