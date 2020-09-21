import {Injectable} from "@angular/core";
import {fromEvent, Subject, timer} from "rxjs";
import {debounce, subscribeOn, takeUntil} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class PhotoUxHelper {

  private cancel$ = new Subject<boolean>();

  private initial_x: number;
  private initial_y: number;
  private initial_top: number;
  private initial_left: number;
  private initial_transition: string;
  private min_top: number;
  private min_left: number;
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
