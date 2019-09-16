import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'nts-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class NtsErrorComponent implements OnInit {
  /** Error message to show */
  @Input() error: any;
  /** Will the close error button appear in the corner */
  @Input() canClose = true;
  /** By default is the full error shown? */
  @Input() errorExpanded = false;
  /** Show error details in accordian */
  @Input() errorShowDetails = true;

  constructor() {}

  ngOnInit() {}
}
