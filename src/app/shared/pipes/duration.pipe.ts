import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a number from an interval counter into a duration, IE 12 > 00:00:12
 */
@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: any): any {
    const days: number = Math.floor(value / 60 / 60 / 24); // Days are dropped for now
    const hours: number = days - Math.floor(value / 60 / 60);
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;

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
  }
}
