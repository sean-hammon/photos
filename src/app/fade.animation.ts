import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeState', [
  state('hidden', style({
    opacity: 0
  })),
  state('visible', style({
    opacity: 1
  })),
  transition('hidden => visible', animate('750ms ease-out')),
  transition('visible => hidden', animate('750ms ease-out'))
]);
