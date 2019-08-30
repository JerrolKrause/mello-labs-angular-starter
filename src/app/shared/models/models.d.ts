/**
 * Generate models with NSwagStudio: https://github.com/RSuter/NSwag/wiki/NSwagStudio
 * Make sure to point at the docs url in the top green header
 * IE http://localhost:57462/swagger/docs/v1
 * NOT http://localhost:57462/swagger/ui/index#/

 Config Options:
  - Set namespace to Models
  - TS version 2.7
  - Generate DTO types: Checked
  - Type Style: Interface
  - Null Value: Null
  - Leave everything else blank or unchecked here
 */

declare namespace Models {
  export interface Auth {
    data: {
      userGuid: string;
      token: string;
      expires?: string;
      expirationSeconds?: number;
    };
    success: boolean;
    meta: { requestTraceId: string };
  }
  export interface User {
    id: number;
    name?: string;
    username: string;
    email?: string;
    address?: {
      street?: string;
      suite?: string;
      city?: string;
      zipcode?: string;
      geo?: {
        lat?: string;
        lng?: string;
      };
    };
    phone?: string;
    website?: string;
    company?: {
      name?: string;
      catchPhrase?: string;
      bs?: string;
    };
  }
  /********************************
   *  BEGIN NSWAG STUDIO COPY/PASTE
   ********************************/

  /********************************
   *  END NSWAG STUDIO COPY/PASTE
   ********************************/
}
