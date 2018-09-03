import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    const temp = value.filter((ele) => {
      return this.compareElement(args, ele.id);
    })
    return temp;
  }

  checkValue(modelValue, elementValue): boolean {
    return this.compareElement(modelValue.id, elementValue.id)|| this.compareElement(modelValue.name, elementValue.name) 
    || this.compareElement(modelValue.userName, elementValue.userName) 
    || this.compareElement(modelValue.location, elementValue.location) 
    || this.compareElement(modelValue.radius, elementValue.radius);
  }

  compareElement(modelElement, objectElement): boolean {
    let returnValue = false;
    console.log(modelElement+',' +objectElement);
    
    if (modelElement !== '' && modelElement !== null && modelElement!==undefined) {
      if (objectElement == modelElement) {
        returnValue = true;
      }
    }else{
      returnValue =true;
    }
    return returnValue;
  }
}
