import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

// import { ApiService } from '$api';
// import { UIStoreService } from '$ui';
// import { Models } from '$models';

@AutoUnsubscribe()
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit, OnDestroy {

  constructor(
    // private api: ApiService, public ui: UIStoreService
  ) { }

  ngOnInit() {}

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}

}
