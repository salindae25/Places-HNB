import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any): string {

    const patt = /[a-zA-Z]{4,10}/;
    return value.toString().match(patt)[0];
  }

}
