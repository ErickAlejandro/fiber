import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHistorial'
})
export class FilterHistorialPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if(arg === '' || arg.length < 3) return value

    const resultFilterHistory = []

    for(const filter of value){
      if(filter.usuario_cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterHistory.push(filter)
      }
    }
    return resultFilterHistory
  }
}
