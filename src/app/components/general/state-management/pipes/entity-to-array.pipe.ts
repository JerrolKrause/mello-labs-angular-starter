import { Pipe, PipeTransform } from '@angular/core';
import { EntityState } from '@datorama/akita';

/**
 * Convert an entity format (such as what is returned by a store) to a normal data array
 */
@Pipe({
  name: 'entityToArray',
})
export class EntityToArray implements PipeTransform {
  transform(value: EntityState<any>): any {
    if (value && value.ids && value.entities) {
      return value.ids.map(id => (value && value.entities ? value.entities[id] : null));
    }

    return value;
  }
}
