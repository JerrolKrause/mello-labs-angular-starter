import { Component, OnInit, Input } from '@angular/core';
import { Domain } from '$domain';

@Component({
  selector: 'nts-api-state',
  templateUrl: './api-state.component.html',
  styleUrls: ['./api-state.component.css'],
})
export class NtsDomainStateComponent implements OnInit {
  /** Default domain state */
  @Input() state!: Domain.State;
  /** Should errors be shown */
  @Input() errorVisible = true;
  /** Custom error message */
  @Input() errorMessage!: string;
  /** Should the loader be shown when data is already present in state */
  @Input() loaderDisabled = true;

  constructor() {}

  ngOnInit() {}
}
