import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { debounce } from 'helpful-decorators';

@Component({
  selector: 'nts-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NtsFilterFieldComponent implements OnInit {
  /** Term entered by the user */
  @Input() filterTerm: string | null = null;
  /** Character size of input box */
  @Input() size = 30;
  /** Should the filter box shrink down to fit nicely when used inline */
  @Input() small = false;
  @Output() filterTermChange: EventEmitter<string | null> = new EventEmitter();

  @Input() placeholder = 'Enter filter term...';

  constructor() {}

  ngOnInit() {}

  @debounce(200)
  onChanges(filterTerm: string | null) {
    this.filterTerm = filterTerm;
    this.filterTermChange.emit(filterTerm);
  }
}
