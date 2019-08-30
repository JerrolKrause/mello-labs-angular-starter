import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'nts-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NtsCounterComponent implements OnInit, OnDestroy {
  public timer$: Observable<number> | null = timer(0, 1000).pipe(
    startWith(0),
    untilDestroyed(this),
  );

  constructor() {}

  ngOnInit() {
    this.start();
  }

  /**
   * Start timer
   */
  public start() {
    this.timer$ = timer(0, 1000).pipe(
      startWith(0),
      untilDestroyed(this),
    );
  }

  /**
   * Stop timer
   */
  public stop() {
    this.timer$ = null;
  }

  /**
   * Reset timer
   */
  public reset() {
    this.stop();
    this.start();
  }

  ngOnDestroy() {}
}
