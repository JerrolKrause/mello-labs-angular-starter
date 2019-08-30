import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert a string to a slug by making lowercase, remove special characters, replace spaces with hyphens
 * IE: "Hello !23 World" => "hello-23-world"
 */
@Pipe({
  name: 'slug',
})
export class SlugPipe implements PipeTransform {
  transform(value: any): any {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/ /gi, '-')
      .replace(/[^A-Z0-9-]/gi, '');
  }
}
