import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { timer, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'nts-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NtsCounterComponent implements OnInit, OnDestroy {
  public timer$!: Observable<string> | null;

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
      map(value => {
        const days = Math.floor(value / 60 / 60 / 24); // Days are dropped for now
        const hours = days - Math.floor(value / 60 / 60);
        const minutes = Math.floor(value / 60);
        const seconds = value - minutes * 60;

        // Convert to string
        let hoursStr = String(hours);
        let minutesStr = String(minutes);
        let secondsStr = String(seconds);

        // Add leading zeroes
        if (hours < 10) {
          hoursStr = '0' + hours;
        }
        if (minutes < 10) {
          minutesStr = '0' + minutes;
        }
        if (seconds < 10) {
          secondsStr = '0' + seconds;
        }

        return hoursStr + ':' + minutesStr + ':' + secondsStr;
      }),
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
