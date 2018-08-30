import { Pipe, PipeTransform } from '@angular/core';
import { ViewPlace } from './places/places.model';

@Pipe({
  name: 'catagoryFilter'
})
export class CatagoryFilterPipe implements PipeTransform {

  transform(value: Array<ViewPlace>, args?: string): any {
    debugger
   return value.filter((ele)=>{
      return ele.Type.toLowerCase()===args.toLowerCase();
    })
   
  }

}
