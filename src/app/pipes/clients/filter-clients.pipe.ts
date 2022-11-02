import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClients'
})
export class FilterClientsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // return null; 

    const resultFilterClients = []

    for(const filterClient of value){
      if(filterClient.nombre_clientepersona.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterClients.push(filterClient)
      }
    }
    return resultFilterClients
  }

}
