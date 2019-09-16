// Type definitions for Microsoft.Maps 8.0 (Change set e6d7cc4)
// Project: https://github.com/Microsoft/Bing-Maps-V8-TypeScript-Definitions
// Definitions by: Ricky Brundritt <https://github.com/rbrundritt>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Map {
  export interface Location {
    metadata?: {
      isBrand?: boolean;
      infoBoxHtml?: () => string;
      title?: string;
      description?: string;
      iconClass?: string;
    };
    /** URL to an image to use as the pushpin icon. Will overwrite the global pushpin icon */
    icon?: string;
    /** Draw a circle/radius around a push pin. Value is in miles */
    radius?: string;
    latitude: number;
    longitude: number;
  }

  export interface Entity {
    id: string;
    ref: Microsoft.Maps.Pushpin | Microsoft.Maps.Polygon;
    type: 'pushpin' | 'circle';
  }

  export interface ViewProps {
    /** What event type triggered the view change */
    didZoom?: boolean;
    didScroll?: boolean;
    /** Zoom level, from 2 (most zoomed out) to 20 (most zoomed in) */
    zoom?: number;
    /** The center position of the viewport in lat/long */
    center?: {
      altitude: number;
      altitudeReference: number;
      latitude: number;
      longitude: number;
    };
    /** The lat/long of the bounding box/viewport dimensions */
    bounds?: [number, number, number, number];
  }

  export interface Options extends Microsoft.Maps.IMapOptions {
    credentials: string;
    /** Zoom level, from 2 (most zoomed out) to 20 (most zoomed in) */
    zoom?: number;
    /** Can pushpins be added to the map by clicking. Single for only one pin, multiple for any number */
    pushPinsAddable?: false | 'single' | 'multiple' = false;
    /** URL to an image to use as the pushpin icon */
    pushPinIcon?: string;
    /** Draw a circle/radius around a push pin. Value is in miles */
    pushPinRadius?: string;
  }
}
