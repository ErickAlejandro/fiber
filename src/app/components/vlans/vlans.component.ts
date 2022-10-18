import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Vlan } from 'src/app/Models/vlan';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vlans',
  templateUrl: './vlans.component.html',
  styleUrls: ['./vlans.component.css']
})
export class VlansComponent implements OnInit {

  urlData = '/vlan/filtrarVlan.php?filtrar&id_ciudad=9'
  urlGetDataFirst = '/vlan/filtrarVlan.php?filtrar='
  urlGetDataSecond = '&id_ciudad=9'
  urlCreate = '/vlan/crearVlan.php'
  urlDeleted = '/vlan/eliminarVlan.php?id='

  vlan: Vlan = new Vlan()
  VlansList!: Vlan[];
  VlanDetails = new Vlan()

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService:DataService) { }

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  getVlanByName(vlan:string){
    this.DataService.getVlanByName(vlan, this.urlGetDataFirst, this.urlGetDataSecond).subscribe((data:Vlan[]) =>{
      return this.VlanDetails = data[0]
    })
  }

  save(vlans:Vlan){
    this.vlan.id_ciudad = 9
    this.vlan.estado_vlan = 'activo'
    this.vlan.buckle2 = 'null'
    this.vlan.ip_rangodireccionesip = 'null'
    this.DataService.createVlans(this.urlCreate, vlans).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!'
      })
      this.refresh()
    })
  }

  // edit(vlan: Vlan){
  //   this.DataService.editVlans()
  // }

  deleted(id:any){
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(data=>{
      Swal.fire({
        icon:'success',
        title: 'Felicitaciones',
        text: 'El dato fue eliminado con Exito!'
      })
      this.refresh()
    })
  }


  ngOnInit(): void {

    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
      })

    this.DataService.getData(this.urlData)
    .subscribe((data: Vlan[]) => {
      this.VlansList = data
    })
  }

}
