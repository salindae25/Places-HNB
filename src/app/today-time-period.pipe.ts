import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todayTimePeriod'
})

export class TodayTimePeriodPipe implements PipeTransform {
  days = [
    { Name: 'Monday', day: 1 },
    { Name: 'Tuesday', day: 2 },
    { Name: 'Wednsday', day: 3 },
    { Name: 'Thursday', day: 4 },
    { Name: 'Friday', day: 5 },
    { Name: 'Saturday', day: 6 },
    { Name: 'Sunday', day: 7 },
  ];
  transform(value: any): any {
    debugger;
    const patt = /[a-zA-Z]{4,10}/;
    let returnValue = '';
    const date = new Date();
    let toDay = date.getDay().toString();
    toDay = this.days.filter((ele) => {

      return ele.day.toString() === toDay;
    })[0].Name;

    value.forEach((element) => {
      const day = element.toString().match(patt)[0];
      if (day === toDay) {
        returnValue = element;
      }
    });
    return returnValue;
  }

}
