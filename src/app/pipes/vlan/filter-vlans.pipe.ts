import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVlans'
})
export class FilterVlansPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // return null;
    const resultFilterVlans = []

    for(const filterVlan of value){
      if(filterVlan.nombre_vlan.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFilterVlans.push(filterVlan)
      }
    }
    return resultFilterVlans
  }

}
