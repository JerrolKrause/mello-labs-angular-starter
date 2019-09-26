import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { WizardStateService } from '../../shared/services/wizard-state.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'nts-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() sections: Wizard.Section[] | undefined;
  @Input() state: Wizard.State | undefined;
  @Input() form: FormGroup | undefined;

  @Input() sectionActiveId: string | undefined;
  @Input() pageActiveId: string | undefined;

  private loaded = false;

  constructor(private store: WizardStateService) {}

  ngOnInit() {
    this.store.sections$.subscribe(res => console.log('Sections', res));
    this.store.state$.subscribe(res => console.log('State', res));
    this.store.sectionActive$.subscribe(res => console.log('Section Active', res));
    this.store.pageActive$.subscribe(res => console.log('Page Active', res));
  }

  ngOnChanges(model: SimpleChanges) {
    // Ignore changes until app is loaded
    if (!this.loaded) {
      return;
    }
    // When new sections are passed in
    if (model.sections && this.sections && this.form) {
      this.store.sectionsAdd(this.sections, this.form); // Not picking up null check
      // TODO: Need to reset wizard if this happens
    }

    // When a new sectionActive is passed in
    if (model.sectionActive && this.sectionActiveId) {
      // this.store.sectionChange(this.sectionActiveId);
    }

    // When a new state object is passed in
    if (model.state) {
      // TODO: Handle state object changes
    }
  }

  ngAfterViewInit() {
    // Attach templates

    // Initialze app
    this.initialize();
    // Mark app loaded to enable ngOnChanges
    this.loaded = true;
  }

  /**
   * Create the initial state of the wizard
   */
  private initialize() {
    // Null check
    if (!this.sections || !this.form) {
      console.warn('No sections or form passed to wizard');
      return;
    }

    // Convert sections to section controls
    // Not picking up null check
    // Load section controls into store
    this.store.sectionsAdd(this.sections, this.form);
    // Update store state. Load state if supplied, if not generate default one
    this.store.stateChange(this.state || this.store.stateCreateDefault(this.sections));

    /** */
    setTimeout(() => {
      this.store.routeChange('next');
      this.store.routeChange('next');
      this.store.routeChange('next');
    }, 1000);

    setTimeout(() => {
      this.store.sectionChange('prev');
      this.store.routeChange('prev');

    }, 2000);

    setTimeout(() => {
     this.store.sectionChange('next');
     this.store.routeChange('next');
     this.store.routeChange('next');
    }, 3000);

    setTimeout(() => {
      this.store.routeChange('next');
    }, 4000);

  }
}