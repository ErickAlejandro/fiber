import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRol'
})
export class FilterRolPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultRol = []

    for(const filterRol of value){
      if(filterRol.nombre_rol.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultRol.push(filterRol)
      }
    }
    return resultRol
  }

}
