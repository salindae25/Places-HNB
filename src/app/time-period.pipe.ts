import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePeriod'
})
export class TimePeriodPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    const patt = /[0-2]{0,1}[0-9]:[0-5][0-9]\sAM\s–\s*[0-2]{0,1}[0-9]:[0-5][0-9]\sPM/;
    return value.toString().match(patt)[0];
  }

}
