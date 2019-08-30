import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
/**
 * Debounce a value so that the input is only allowed to change within a specified time frame. Default is 300ms
 */
@Pipe({ name: 'debounce', pure: false })
export class DebouncePipe implements PipeTransform {
  private currentValue: any = null;
  private transformValue: any = null;
  private timeoutHandle: any = -1;

  constructor(private changeDetector: ChangeDetectorRef, private zone: NgZone) {}

  transform(value: any, debounceTime?: number): any {
    if (this.currentValue === null) {
      this.currentValue = value;
      return value;
    }
    if (this.currentValue === value) {
      // there is no value that needs debouncing at this point
      clearTimeout(this.timeoutHandle);
      return value;
    }
    if (this.transformValue !== value) {
      // there is a new value that needs to be debounced
      this.transformValue = value;
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = setTimeout(
        () => {
          this.zone.run(() => {
            this.currentValue = this.transformValue;
            this.transformValue = null;
            this.changeDetector.markForCheck();
          });
        },
        typeof debounceTime === 'number' ? debounceTime : 300,
      );
    }
    return this.currentValue;
  }
}
