import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'pwNumberToString',
  standalone: true,
})
export class NumberToStringPipe implements PipeTransform {

  transform(value:number): string {
    return value.toString();
  }

}
