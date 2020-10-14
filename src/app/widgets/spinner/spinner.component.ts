import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, transition, trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
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
export class SpinnerComponent {

  loading: string;
  private visible: boolean;

  @Input() set display(value: boolean) {
    this.visible = value;
  }

  get display() {
    return this.visible;
  }

  constructor() { }

  animationDone($event) {
    // this.display = false;
  }

}
