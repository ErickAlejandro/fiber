import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pais } from 'src/app/Models/pais';
import { Pronvinces } from 'src/app/Models/provinces';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css']
})
export class ProvincesComponent implements OnInit {

  constructor(private DataService: DataService) { }

  urlGetData = '/provincia/filtrarProvincia.php?filtrar='
  urlEditProvince = '/provincia/editarProvincia.php'
  urlCreateProvince = '/provincia/crearProvincia.php'
  urlDeletedProvincia = '/provincia/eliminarProvincia.php?id='

  urlGetPais = '/pais/filtrarPais.php?filtrar='

  provincesList!: Pronvinces[]
  provinceDetail = new Pronvinces()

  paisList!: Pais[]
  province: Pronvinces = new Pronvinces()

  pageSize = 5
  since:number = 0
  to:number = 5

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

  getCapturePais(){
    this.DataService.getDataPais(this.urlGetPais).subscribe((data: Pais[]) =>{
      this.paisList = data
    })
  }

  editProvince(provinces:Pronvinces){
    this.DataService.getEditProvinces(this.urlEditProvince, provinces).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  save(province: Pronvinces){
    province.estado_provincia = 'activo'
    this.DataService.createProvince(this.urlCreateProvince, province).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      this.refresh()
    })
  }

  getProvinceByName(province: string){
    this.DataService.getProvinceByName(this.urlGetData, province).subscribe((data: Pronvinces[]) =>{
      return this.provinceDetail = data[0]
    })
  }

  deleted(id:any){
    this.DataService.deletedCity(this.urlDeletedProvincia, id).subscribe(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
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

    this.getCapturePais()

    this.DataService.getDataProvinces(this.urlGetData).subscribe((data: Pronvinces[]) =>{
      this.provincesList = data
    })
  }
}
