import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

/**
 * When this element is loaded, automatically attach focus
 * USAGE:
 * appFocus
 * [appFocus]="false" // Disable
 */
@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements AfterViewInit {
  /** Default should focus on load, can be set to false to disable */
  @Input() appFocus: boolean | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.appFocus !== false && this.el && this.el.nativeElement) {
      setTimeout(() => this.el.nativeElement.focus(), 500);
    }
  }
}
