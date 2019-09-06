import { WizardContentTypes } from '../wizard/wizard.enums';

declare namespace Wizard {
  export interface State {
    sectionActiveId: string;
    pageActiveId: string;
    status: Record<string, SectionStatus>;
    // flags: Record<string, any>;
  }

  export interface SectionStatus {
    /** Is this the currently active section */
    active: boolean;
    /** Has this section been completed */
    completed: boolean;
    /** Last currently visited page */
    pageLast: string | null;
    /** Has this section been started */
    started: boolean;
  }

  export interface Section {
    /** Human readable section title */
    title: string;
    /** URL safe string for use in routing. If not supplied, will be generated from title */
    slug?: string;
    /** Distinct unique ID or GUID for this page. If not supplied, will be generated from title */
    uniqueId?: string;
    /** ID of initial starting route */
    routeStart: string;
    settings: {
      /** Are all previous sections required to be complete before this section is accessible? */
      previousRequired?: boolean;
      /** Is this the last section in the wizard flow */
      isLast?: boolean;
    };
    /** Any custom data needed by this page */
    data?: any | null;
    routing: Route[];
    pages: Page[];
  }

  export interface SectionControl extends Section {
    sectionNext: string | null;
    routing: Record<string, Wizard.Route>;
    pages: Record<string, Wizard.Page>;
    src: Section;
    status: SectionStatus;
  }

  export interface PageControl extends Page {
    controlsById: { [key: string]: AbstractControl };
    controls: AbstractControl[];
    valid: boolean;
    validControls: boolean;
    invalid: boolean;
    isActive: boolean;
    dir?: 'Next' | 'Back';
    controlsMarkAsTouched();
  }

  export interface Page {
    /** Human readable page title */
    title: string;
    /** URL safe string for use in routing. If not supplied, will be generated from title */
    slug?: string;
    /** Distinct unique ID or GUID for this page. If not supplied, will be generated from title */
    uniqueId?: string;
    /** Data is used to store page information not used by the wizard */
    data?: any | null;

    settings?: {
      /** Should this page hide the section title and remove the extra padding */
      fullScreen?: boolean;
      /** Show the back button */
      backButtonVisible?: boolean;
      /** Show the next button */
      nextButtonVisible?: boolean;
    };

    events?: Events;
    content: any[];

    titleShort?: string;
    /** Should the title be visible on the page? Title is used for things like analytics */
    titleShow?: boolean;

    data?: Record<string, any>;
    canSave?: boolean;
    /** An ID to populate the ariaDescribedBy attribute. Another element on the page needs to have an ID that corresponds */
    ariaDescribedById?: string;
    /** Use a custom validator for this page */
    validator?: PageValidator;
    /** The ID of the page validator to use from validators.ts */
    validatorId?: string;
    pageId: string;
    /** Is this the last page in the section, go to next section */
    isLastPage?: boolean;
    // content: (FormField | Html | Feature | Buttons | ContentColumns)[];
    /** Show the back button */
    showButtonBack?: boolean;
    /** Show the next button */
    showButtonNext?: boolean;
    /** Actions apply transformations to data or emit actions to parent to perform */
    actions?: Action[];

    fullscreen?: boolean;
  }

  export interface Events {
    onInit: Function;
    onDestroy: Function;
    // Need to do the following items on next/back:
    // True - default behavior
    // False - prevent page transition
    // stateChange - Override default behavior with the statechange enum
    onNext: Function;
    onPrevious: Function;
  }

  export interface Route {
    uniqueId: string;
  }

  export interface Content {
    /** Type of content */
    type: WizardContentTypes;
    /** Data is used to store page information not used by the wizard */
    data?: any | null;
    /** Any css classes to apply */
    classes?: string;
    /** Is this type of content hidden to the user */
    hidden?: boolean | [];
  }

  export interface Html extends Content {
    type: WizardContentTypes.html;
    html: string;
  }

  export interface Row extends Content {
    columns: Column[];
  }

  export interface Column {
    columnSize: number;
    content: (FormField | Html)[];
  }

  export interface FormField extends Content {
    /** Field or property in the loan model */
    field: string;
    formFieldType:
      | 'text'
      | 'number'
      | 'select'
      | 'textarea'
      | 'checkbox'
      | 'buttonGroup'
      | 'toggle'
      | 'iconGroup'
      | 'currency'
      | 'phoneNumber'
      | 'email'
      | 'date'
      | 'autoComplete'
      | 'ssn'
      | 'autoCompleteAddress'
      | 'mapAutoCompleteCity'
      | 'mapAutoCompleteZip';
    placeholder?: string;
    hint?: string;
    tooltip?: string;
    prefix?: string;
    suffix?: string;
    minlength?: number;
    maxlength?: number;

    /** If a select or button group. This is only for fixed properties, alterntnatively use datafields */
    formFieldData?: FormFieldData[];
    /** If a select or button group, use this data from inside the dataField input */
    dataField?: string;
    /** Format to pass to the pipe for custom control */
    format?: string;
    validators?: Validators | null;

    disabled?: boolean;
    /** Should this formfield be a standalone formcontrol instead of being part of the parent formgroup */
    // standalone?: boolean;
    /** Show the error message if error */
    // showError?: boolean;
    // errorCustom?: string;
  }

  export interface Validators {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
  }
}
