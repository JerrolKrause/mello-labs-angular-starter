import { Directive, Input, OnInit, OnDestroy, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { debounce } from 'helpful-decorators';

interface DomOptions {
  attributes: boolean;
  childList: boolean;
  subtree: boolean;
}

interface Dimensions {
  width: string | null;
  height: string | null;
}

/**
 * Watches for any changes to a DOM element and fires a callback when that happens
 * Only callback is required. Be sure to bind the function.
 * Currently uses polling for width & height changes, mutation observer doesn't detect these
 * 
 * USAGE SHORT: appDomObserver [callback]="function.bind(this)"
 * USAGE FULL:
 * appDomObserver [callback]="function.bind(this)" [changesToAttr]="true" [changesToChildren]="false" [changesToData]="false" 
   [changesToElementResize]="true"  [changesToWindowResize]="true"
 */
@Directive({
  selector: '[appDomObserver]',
})
export class DomObserverDirective implements OnInit, OnDestroy, AfterViewInit {
  /** Watch attribute changes */
  @Input() changesToAttr = true;
  /** Watch changes to children nodes */
  @Input() changesToChildren = false;
  /** Watch changes to data */
  @Input() changesToData = false;
  /** Watch changes to DOM element size (width/height) */
  @Input() changesToElementResize = true;
  /** Watch changes to data */
  @Input() changesToWindowResize = true;
  /** Callback method to execute when this DOM element changes */
  @Input() callback: Function | undefined;

  /** Watch changes to data*/
  // @Output() domChange = new EventEmitter<any>();

  /** Configuration needed by mutation observer */
  private config: DomOptions = {
    attributes: this.changesToAttr,
    childList: this.changesToChildren,
    subtree: this.changesToData,
  };

  /** Holds active observer */
  private observer: MutationObserver | undefined;

  /** Last dimensions of element */
  private dimensionsLast: Dimensions = {
    width: null,
    height: null,
  };

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // If changesToElementResize is specified, set initial width & height and start polling
    if (this.changesToElementResize && this.el && this.el.nativeElement) {
      // Set default dimensions
      this.dimensionsLast = this.dimensionsGetNew();
      this.startPollingDimensions();
      this.startMutationObserver();
    }
  }

  /**
   * Check for changes to this elements dimensions
   */
  public startPollingDimensions() {
    const result = this.dimensionsCheck(this.dimensionsLast, this.dimensionsGetNew());
    if (result) {
      this.dimensionsLast = result;
      this.executeCallback();
    }
    // Restart method
    window.setTimeout(() => this.startPollingDimensions(), 200);
  }

  /**
   * Check element dimensions, return newer if changed
   * @param old
   * @param newer
   */
  public dimensionsCheck(old: Dimensions, newer: Dimensions) {
    if (old.width !== newer.width || old.height !== newer.height) {
      return newer;
    }
    return false;
  }

  /**
   * Get latest element dimensions
   */
  private dimensionsGetNew() {
    return <Dimensions>{
      width: this.el.nativeElement.getBoundingClientRect().width,
      height: this.el.nativeElement.getBoundingClientRect().height,
    };
  }

  /**
   * Start the mutation observer
   */
  private startMutationObserver() {
    // If mutation observer available, start observable
    if ('MutationObserver' in window) {
      this.observer = new MutationObserver(() => {
        this.executeCallback();
      });
      this.observer.observe(this.el.nativeElement, this.config);
    }
  }

  /**
   * On a window resize event
   * @param _event
   */
  @HostListener('window:resize', ['$event'])
  @debounce(200)
  onResize(_event: Event) {
    if (this.changesToWindowResize) {
      this.executeCallback();
    }
  }

  /** Execute callback after making sure it is a function */
  @debounce(200)
  private executeCallback() {
    if (typeof this.callback === 'function') {
      this.callback();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
