import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Pais } from 'src/app/Models/pais';
import { Pronvinces } from 'src/app/Models/provinces';
import { DataService } from 'src/app/services/data.service';
import { AddProvinces } from 'src/app/store/provinces/provinces.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css']
})
export class ProvincesComponent implements OnInit {

  constructor(private DataService: DataService, private store: Store) { }

  public addProvinces (provinces: Pronvinces[]){
    this.store.dispatch(new AddProvinces(provinces))
  }

  filterPosCountries = ''

  urlGetData = '/provincia/filtrarProvincia.php?filtrar='
  urlEditProvince = '/provincia/editarProvincia.php'
  urlCreateProvince = '/provincia/crearProvincia.php'
  urlDeletedProvincia = '/provincia/eliminarProvincia.php?id='

  urlGetPais = '/pais/filtrarPais.php?filtrar='

  provincesList!: Pronvinces[]
  provinceDetail = new Pronvinces()
  flagOptions!: string
  selectCountry!: Pais

  paisList!: Pais[]
  countryList!: Pais[]
  province: Pronvinces = new Pronvinces()

  pageSize = 5
  since:number = 0
  to:number = 5

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  preSave(provinces: Pronvinces){
    this.province = provinces
  }

  preSaveEdit(provinceD: Pronvinces){
    this.provinceDetail = provinceD
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

    if(provinces.nombre_pais == '' || provinces.nombre_provincia == ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    }else{
      this.DataService.getEditProvinces(this.urlEditProvince, provinces).subscribe(data =>{
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Editaste la información exitosamente!'
        })
        this.refresh()
      })
    }
  }

  save(province: Pronvinces){
    province.estado_provincia = 'activo'
    if(province.nombre_pais == '' || province.nombre_provincia == ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    }else{
      this.DataService.createProvince(this.urlCreateProvince, province).subscribe(data =>{
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Agregaste una nueva Ciudad!',
        })
        this.refresh()
      })
    }
  }

  getProvinceByName(provinceName: string){
    this.store.select(state => state.provinces.provinces).subscribe((data: Pronvinces[]) =>{
      this.provinceDetail = data.filter((province) => province.nombre_provincia == provinceName)[0]
      console.log(this.provinceDetail)
    })
  }

  getProvinceByEdit(province: string){
    this.DataService.getProvinceByName(this.urlGetData, province).subscribe((data: Pronvinces[]) =>{
      this.provinceDetail = data[0]
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

    this.DataService.getDataPais(this.urlGetPais).subscribe((data: Pais[]) =>{
      this.paisList = data
    })

    this.getCapturePais()

    this.DataService.getDataProvinces(this.urlGetData).subscribe((data: Pronvinces[]) =>{
      this.provincesList = data
      this.addProvinces(data)
    })
  }
}
