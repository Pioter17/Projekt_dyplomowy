import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'NumberToString',
  standalone: true,
})
export class NumberToStringPipe implements PipeTransform {

  transform(value:number): string {
    return value.toString();
  }

}
