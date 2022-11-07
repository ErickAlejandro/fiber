import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cities } from 'src/app/Models/cities';
import { Pronvinces } from 'src/app/Models/provinces';
import Swal from 'sweetalert2';
import { Store } from '@ngxs/store';
import { AddCities, RemoveCities } from '../../store/cities/cities.actions';
import { DataService } from '../../services/data.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {
  urlCities = 'ciudad/filtrarCiudad.php?filtrar='
  urlCreateCity = 'ciudad/crearCiudad.php'
  urlDeletedCity = 'ciudad/eliminarCiudad.php?id='
  urlEditCity = 'ciudad/editarCiudad.php'

  urlGetDataProvincia = '/provincia/filtrarProvincia.php?filtrar='
  selectProvince!: Pronvinces

  city: Cities = new Cities();
  citiesList!: Cities[];
  cityDetail = new Cities();

  provincesList!: Pronvinces[]
  flagOptions!: string

  provinceDetail!: Pronvinces[]
  filterPosProvinces = ''

  pageSize = 5
  since: number = 0
  to: number = 5
  dataJson: any;


  constructor(private DataService: DataService, private store: Store, private router: Router) {

  }

  public addCities(cities: Cities[]) {
    this.store.dispatch(new AddCities(cities));
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;

  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  getCaptureProvince() {
    this.DataService.getDataProvinces(this.urlGetDataProvincia).subscribe((data: Pronvinces[]) => {
      this.provinceDetail = data
    })
  }

  save(city: Cities) {
    city.estado_ciudad = 'activo'
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando una nueva ciudad...',
      showConfirmButton: false,
    })
    if (city.nombre_provincia == '' || city.nombre_ciudad == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    } else {
      this.DataService.createCity(city, this.urlCreateCity).subscribe(data => {
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
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  preSave(cities: Cities) {
    this.city = cities
  }

  preSaveEdit(citiesD: Cities) {
    this.cityDetail = citiesD
  }


  getCityByName(cityName: string) {
    this.store.select(state => state.cities.cities).subscribe((data: Cities[]) => {
      this.cityDetail = data.filter((city) => city.nombre_ciudad == cityName)[0]
      console.log(this.cityDetail)
    });
  }

  getCityForEdit(city: string) {
    this.DataService.getCityByName(city, this.urlCities).subscribe((data: Cities[]) => {
      this.cityDetail = data[0]
    })
  }

  edit(city: Cities) {
    this.cityDetail.estado_ciudad = 'activo'
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })
    if (city.nombre_ciudad == '' || city.nombre_provincia == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es igual al anterior!',
      })
    } else {
      this.DataService.modifiedCity(city, this.urlEditCity).subscribe(data => {
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
            text: 'Editaste la información!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  deleted(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })
    this.DataService.deletedCity(this.urlDeletedCity, id).subscribe(res => {
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

    this.getCaptureProvince()

    this.DataService.getDataProvinces(this.urlGetDataProvincia).subscribe((data: Pronvinces[]) => {
      this.provincesList = data
    })

    this.DataService.getData(this.urlCities)
      .subscribe((data: Cities[]) => {
        this.citiesList = data
        this.addCities(data)
        Swal.close()

        if (this.citiesList == null) {
          Swal.fire({
            icon: 'info',
            title: 'La tabla esta vacia',
            timer: 2000,
            showConfirmButton: false,
          })
        } else {
          console.log('la tabla si tiene datos');
        }
      })
  }
}