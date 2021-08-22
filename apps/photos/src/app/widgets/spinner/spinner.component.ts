import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  animate,
  transition,
  trigger,
  state,
  style,
} from '@angular/animations';
import { fadeAnimation } from '@app/fade.animation';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  animations: [fadeAnimation],
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

  constructor() {}
}
