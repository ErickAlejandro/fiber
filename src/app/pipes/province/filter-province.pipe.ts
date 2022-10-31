import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProvince'
})
export class FilterProvincePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProvince = []

    for(const filterProvince of value){
      if(filterProvince.nombre_provincia.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultProvince.push(filterProvince)
      }
    }
    return resultProvince
  }

}
