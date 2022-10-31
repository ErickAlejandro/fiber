import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCountry'
})
export class FilterCountryPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultFilterCountry = []

    for(const filterCountry of value){
      if(filterCountry.nombre_pais.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterCountry.push(filterCountry)
      }
    }
    return resultFilterCountry
  }

}
