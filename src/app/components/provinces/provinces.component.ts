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
  dataJson: any;

  constructor(private DataService: DataService, private store: Store) { }

  public addProvinces(provinces: Pronvinces[]) {
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
  since: number = 0
  to: number = 5

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  preSave(provinces: Pronvinces) {
    this.province = provinces
  }

  preSaveEdit(provinceD: Pronvinces) {
    this.provinceDetail = provinceD
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;

  }

  getCapturePais() {
    this.DataService.getDataPais(this.urlGetPais).subscribe((data: Pais[]) => {
      this.paisList = data
    })
  }

  editProvince(provinces: Pronvinces) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })
    if (provinces.nombre_pais == '' || provinces.nombre_provincia == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o es igual al anterior!',
      })
    } else {
      this.DataService.getEditProvinces(this.urlEditProvince, provinces).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))

        if(this.dataJson['respuesta'] != 'ok'){
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Editaste la información exitosamente!'
          })
          location.reload()
        }
      })
    }
  }

  save(province: Pronvinces) {
    province.estado_provincia = 'activo'
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando creación...',
      showConfirmButton: false,
    })

    if (province.nombre_pais == '' || province.nombre_provincia == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    } else {
      this.DataService.createProvince(this.urlCreateProvince, province).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))

        if(this.dataJson['respuesta'] != 'ok'){
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Agregaste una nueva Ciudad!',
          })
          location.reload()
        }
      })
    }
  }

  getProvinceByName(provinceName: string) {
    this.store.select(state => state.provinces.provinces).subscribe((data: Pronvinces[]) => {
      this.provinceDetail = data.filter((province) => province.nombre_provincia == provinceName)[0]
      console.log(this.provinceDetail)
    })
  }

  getProvinceByEdit(province: string) {
    this.DataService.getProvinceByName(this.urlGetData, province).subscribe((data: Pronvinces[]) => {
      this.provinceDetail = data[0]
    })
  }

  deleted(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })

    this.DataService.deletedCity(this.urlDeletedProvincia, id).subscribe(res => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
        showConfirmButton: false,
      })
      location.reload()
    })
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })

    this.DataService.getDataPais(this.urlGetPais).subscribe((data: Pais[]) => {
      this.paisList = data
    })

    this.getCapturePais()

    this.DataService.getDataProvinces(this.urlGetData).subscribe((data: Pronvinces[]) => {
      this.provincesList = data
      this.addProvinces(data)
      Swal.close()

      if (this.provincesList == null) {
        Swal.fire({
          icon: 'info',
          title: 'La tabla esta vacia',
          timer: 2000,
          showConfirmButton: false,
        })
      } else {
        console.log('La tabla si tiene datos');
      }
    })
  }
}
