/**
 * Definitions for fullCalendar. Their repo isn't strongly typed...
 * Pulled from node_modules\@fullcalendar\core\main.d.ts
 */
declare namespace NtsCalendar {
  export type DefaultView =
    | 'dayGridMonth'
    | 'dayGridWeek'
    | 'timeGridWeek'
    | 'listWeek'
    | 'listDay'
    | 'listWeek'
    | 'listMonth'
    | 'listYear';
  /** https://fullcalendar.io/docs/event-object */
  export interface Event {
    title: string;
    date: Date;
    id?: string;
    groupId?: string;
    allDay?: boolean;
    start?: Date;
    end?: Date;
    url?: string;
    classNames?: string[];
    editable?: boolean;
    startEditable?: boolean;
    durationEditable?: boolean;
    resourceEditable?: boolean;
    rendering?: 'background' | 'inverse-background';
    overlap?: any;
    constraint?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    extendedProps?: any;
    source?: any;
  }
  export interface DateClick {
    date: Date;
    dateStr: string;
    allDay: boolean;
    resource?: any;
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: View;
  }
  export interface EventClick {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: View;
  }
  export interface Header {
    /** Space delimited with the following options: title, today, prev, next, prevYear, nextYear, today */
    left: string;
    center: string;
    right: string;
  }

  export interface EventApi {
    readonly source: EventSourceApi | null;
    readonly start: Date | null;
    readonly end: Date | null;
    readonly id: string;
    readonly groupId: string;
    readonly allDay: boolean;
    readonly title: string;
    readonly url: string;
    readonly rendering: string;
    readonly startEditable: boolean;
    readonly durationEditable: boolean;
    readonly constraint: any;
    readonly overlap: any;
    readonly allow: any;
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly textColor: string;
    readonly classNames: string[];
    readonly extendedProps: any;
    _calendar: Calendar;
    _def: EventDef;
    _instance: EventInstance | null;
    setProp(name: string, val: string): void;
    setExtendedProp(name: string, val: any): void;
    setStart(
      startInput: DateInput,
      options?: {
        granularity?: string;
        maintainDuration?: boolean;
      },
    ): void;
    setEnd(
      endInput: DateInput | null,
      options?: {
        granularity?: string;
      },
    ): void;
    setDates(
      startInput: DateInput,
      endInput: DateInput | null,
      options?: {
        allDay?: boolean;
        granularity?: string;
      },
    ): void;
    moveStart(deltaInput: DurationInput): void;
    moveEnd(deltaInput: DurationInput): void;
    moveDates(deltaInput: DurationInput): void;
    setAllDay(
      allDay: boolean,
      options?: {
        maintainDuration?: boolean;
      },
    ): void;
    formatRange(formatInput: FormatterInput): any;
    mutate(mutation: EventMutation): void;
    remove(): void;
  }

  interface View {
    readonly activeStart: Date;
    readonly activeEnd: Date;
    readonly currentStart: Date;
    readonly currentEnd: Date;
    usesMinMaxTime: boolean;
    dateProfileGeneratorClass: any;
    on: EmitterInterface['on'];
    one: EmitterInterface['one'];
    off: EmitterInterface['off'];
    trigger: EmitterInterface['trigger'];
    triggerWith: EmitterInterface['triggerWith'];
    hasHandlers: EmitterInterface['hasHandlers'];
    viewSpec: ViewSpec;
    dateProfileGenerator: DateProfileGenerator;
    type: string;
    title: string;
    queuedScroll: any;
    eventOrderSpecs: any;
    nextDayThreshold: Duration;
    isNowIndicatorRendered: boolean;
    initialNowDate: DateMarker;
    initialNowQueriedMs: number;
    nowIndicatorTimeoutID: any;
    nowIndicatorIntervalID: any;
    initialize(): void;
    render(props: ViewProps): void;
    destroy(): void;
    updateSize(isResize: boolean, viewHeight: number, isAuto: boolean): void;
    updateBaseSize(isResize: boolean, viewHeight: number, isAuto: boolean): void;
    renderDatesWrap(dateProfile: DateProfile): void;
    unrenderDatesWrap(): void;
    renderDates(dateProfile: DateProfile): void;
    unrenderDates(): void;
    renderBusinessHours(businessHours: EventStore): void;
    unrenderBusinessHours(): void;
    renderDateSelectionWrap(selection: DateSpan): void;
    unrenderDateSelectionWrap(selection: DateSpan): void;
    renderDateSelection(selection: DateSpan): void;
    unrenderDateSelection(selection: DateSpan): void;
    renderEvents(eventStore: EventStore): void;
    unrenderEvents(): void;
    sliceEvents(eventStore: EventStore, allDay: boolean): EventRenderRange[];
    computeEventDraggable(eventDef: EventDef, eventUi: EventUi): boolean;
    computeEventStartResizable(eventDef: EventDef, eventUi: EventUi): any;
    computeEventEndResizable(eventDef: EventDef, eventUi: EventUi): boolean;
    renderEventSelectionWrap(instanceId: string): void;
    unrenderEventSelectionWrap(instanceId: string): void;
    renderEventSelection(instanceId: string): void;
    unrenderEventSelection(instanceId: string): void;
    renderEventDragWrap(state: EventInteractionState): void;
    unrenderEventDragWrap(state: EventInteractionState): void;
    renderEventDrag(state: EventInteractionState): void;
    unrenderEventDrag(state: EventInteractionState): void;
    renderEventResizeWrap(state: EventInteractionState): void;
    unrenderEventResizeWrap(state: EventInteractionState): void;
    renderEventResize(state: EventInteractionState): void;
    unrenderEventResize(state: EventInteractionState): void;
    startNowIndicator(dateProfile: DateProfile): void;
    updateNowIndicator(): void;
    stopNowIndicator(): void;
    getNowIndicatorUnit(dateProfile: DateProfile): void;
    renderNowIndicator(date: any): void;
    unrenderNowIndicator(): void;
    addScroll(scroll: any): void;
    popScroll(isResize: boolean): void;
    applyQueuedScroll(isResize: boolean): void;
    queryScroll(): any;
    applyScroll(scroll: any, isResize: boolean): void;
    computeDateScroll(duration: Duration): {};
    queryDateScroll(): {};
    applyDateScroll(scroll: any): void;
    scrollToDuration(duration: Duration): void;
  }
}
