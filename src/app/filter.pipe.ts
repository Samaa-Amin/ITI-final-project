import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value, kidfriendly, status, reservation) {
    let newvalue = [];
    for (let place of value) {

      newvalue.push(place);
      console.log("ana fi el foooor")

    }
    if (newvalue.length == 0) {
      console.log("will return value")
      console.log(value)
      return value
    }
    else {
      console.log("will return newvalue")
      console.log(newvalue)
      return newvalue;
    }


  }






}
