import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    const resultFilterCity = []

    for(const filterCity of value){
      if(filterCity.nombre_ciudad.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterCity.push(filterCity)
      }
    }
    return resultFilterCity
  }

}
