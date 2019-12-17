import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

// import { DomainService } from '$domain';
import { UiStateService } from '$ui';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  
  constructor(
    // private domainState: DomainService, // Global domain state
    public uiState: UiStateService, // Global UI state
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
