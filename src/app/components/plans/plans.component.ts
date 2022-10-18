import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Planes } from 'src/app/Models/planes';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  urlgetData = '/Planes/filtrarPlanes.php?filtrar=&id_ciudad=9'
  urlFirstPart = '/Planes/filtrarPlanes.php?filtrar='
  urlSecondPart = '&id_ciudad=9'
  urlCreatePlans = '/Planes/crearPlanes.php'
  urlDeleted = '/Planes/eliminarPlanes.php?id='
  urlEditPlans = '/Planes/editarPlanes.php'

  plans:Planes = new Planes()
  plansList!: Planes[]
  plansDetail = new Planes()

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService) { }

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
      })
  
      this.DataService.getData(this.urlgetData)
      .subscribe((data: Planes[]) => {
        this.plansList = data
      })
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  save(plans: Planes){
    plans.estado_planes = 'activo'
    plans.id_ciudad = 9
    this.DataService.createPlans(this.urlCreatePlans, plans).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste un nuevo Plan'
      })
      this.refresh()
    })
  }

  edit(plans: Planes){
    this.DataService.editPlans(plans, this.urlEditPlans).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la iformación exitosamente!'
      })
      this.refresh()
    })
  }

  deleted(id: any){
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'La información fue eliminada con Exito!'
      })
      this.refresh()
    })
  }

  getPlanByName(plans:String){
    this.DataService.getPlansByName(plans, this.urlFirstPart, this.urlSecondPart).subscribe((data: Planes[]) =>{
      return this.plansDetail = data[0]
    })
  }

}
