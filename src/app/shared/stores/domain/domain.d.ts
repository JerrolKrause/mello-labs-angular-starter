import { EntityState } from '@datorama/akita';

declare namespace Domain {
  export interface State extends EntityState<any> {
    modifying: boolean;
  }
}
