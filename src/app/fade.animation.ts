import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeState', [
  state('hidden', style({
    opacity: 0
  })),
  state('visible', style({
    opacity: 1
  })),
  transition('hidden => visible', animate('500ms')),
  transition('visible => hidden', animate('1000ms ease-out'))
]);
