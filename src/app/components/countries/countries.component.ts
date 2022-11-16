import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Pais } from 'src/app/Models/pais';
import { DataService } from 'src/app/services/data.service';
import { AddPais } from 'src/app/store/countries/countries.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  dataJson: any;

  constructor(private DataService: DataService, private store: Store) { }
  urlDataCountries = '/pais/filtrarPais.php?filtrar='
  urlCreateCountries = '/pais/crearPais.php'
  urlEditCountry = '/pais/editarPais.php'
  urlDeleted = '/pais/eliminarPais.php?id='

  textoBuscar = ''

  country: Pais = new Pais()
  countriesList!: Pais[]
  countryDetails = new Pais()

  pageSize = 5
  since: number = 0
  to: number = 5

  addCountries(countries: Pais[]) {
    this.store.dispatch(new AddPais(countries))
  }

  getCountryByName(countryName: string) {
    this.store.select(state => state.paises.paises).subscribe((data: Pais[]) => {
      this.countryDetails = data.filter((country) => country.nombre_pais == countryName)[0]
      console.log(this.countryDetails)
    })
  }
  paisListAux!: Pais[]
  onKey(event: any){
    let buscarPaisList: Pais[] = []

    if(this.textoBuscar.length != 0){
      this.paisListAux.forEach(element => {
    if(element.nombre_pais.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 ){
          buscarPaisList.push(element)
        }
      });
      this.countriesList = null
      this.countriesList = buscarPaisList
    }else{
      this.countriesList = this.paisListAux
    }
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  getPaisEdit(pais: string) {
    this.DataService.getCountriesByName(this.urlDataCountries, pais).subscribe((data: Pais[]) => {
      this.countryDetails = data[0]
    })
  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  save(pais: Pais) {
    pais.estado_pais = 'activo'

    pais.id = pais.id_pais
    pais.nombre = pais.nombre_pais
    pais.estado = pais.estado_pais

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando un nuevo pais...',
      showConfirmButton: false,
    })

    if (pais.nombre_pais == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    } else {
      this.DataService.createCountries(this.urlCreateCountries, pais).subscribe(data => {
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
            showConfirmButton: false,
            text: 'Agregaste un nuevo Pais!',
          })
          location.reload()
        }
      })
    }
  }

  edit(pais: Pais) {
    pais.estado_pais = 'activo'

    pais.id = pais.id_pais
    pais.nombre = pais.nombre_pais
    pais.estado = pais.estado_pais

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })

    if (pais.nombre_pais == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o es igual al anterior!',
      })
    } else {
      this.DataService.editCountries(this.urlEditCountry, pais).subscribe(data => {
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
            showConfirmButton: false,
            text: 'Editaste la información exitosamente!'
          })
          location.reload()
        }
      })
    }
  }

  deleted(id: any, pais: Pais) {
    pais.id = this.countryDetails.id_pais
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })

    this.DataService.deletedCity(this.urlDeleted, id).subscribe(res => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'La información fue eliminada con Exito!'
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

    this.DataService.getDataPais(this.urlDataCountries).subscribe((data: Pais[]) => {
      this.countriesList = data
      this.paisListAux = data
      this.addCountries(data)
      Swal.close()
      if (this.countriesList == null) {
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
