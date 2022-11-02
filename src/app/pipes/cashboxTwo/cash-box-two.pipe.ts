import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cashBoxTwo'
})
export class CashBoxTwoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // return null;

    const resultFilterCashBoxTwo = []

    for(const filterCashBoxTwo of value){
      if(filterCashBoxTwo.nombre_cajanivel2.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterCashBoxTwo.push(filterCashBoxTwo)
      }
    }
    return resultFilterCashBoxTwo
  }

}
