import { SessionStore } from './../../store/session.store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, transition, trigger, state, style } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass'],
  animations: [
    trigger('spinnerState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden => visible', animate('10ms')),
      transition('visible => hidden', animate('1500ms ease-out'))
    ])
  ]

})
export class SpinnerComponent implements OnInit, OnDestroy {

  loading: string;
  display: boolean;
  unsub$: Subject<boolean>;

  constructor(
    private session: SessionStore
  ) {
    this.display = true;
  }

  ngOnInit() {

    this.session.loading$
      .pipe(
        takeUntil(this.unsub$)
      )
      .subscribe(loading => {
        this.loading = loading ? 'visible' : 'hidden';
        this.display = true;
      });

  }


  ngOnDestroy() {
    this.unsub$.next(true);
    this.unsub$.complete();
  }


  animationDone($event) {
    this.display = false;
  }

}
