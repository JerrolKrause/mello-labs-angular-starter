// Type definitions for Microsoft.Maps 8.0 (Change set e6d7cc4)
// Project: https://github.com/Microsoft/Bing-Maps-V8-TypeScript-Definitions
// Definitions by: Ricky Brundritt <https://github.com/rbrundritt>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped



interface Location {
  metadata?: {
    infoBoxHtml?: () => string;
    title?: string;
    description?: string;
  }
  latitude: number;
  longitude: number;
}