import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCashBoxOne'
})
export class FilterCashBoxOnePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // return null;

    const resultFilterCashBoxOne = []

    for(const filterCashBoxOne of value){
      if(filterCashBoxOne.nombre_cajanivel1.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterCashBoxOne.push(filterCashBoxOne)
      }
    }
    return resultFilterCashBoxOne
  }

}
