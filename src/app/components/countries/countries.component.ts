import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pais } from 'src/app/Models/pais';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private DataService: DataService) { }
  urlDataCountries = '/pais/filtrarPais.php?filtrar='
  urlCreateCountries = '/pais/crearPais.php'
  urlEditCountry = '/pais/editarPais.php'
  urlDeleted = '/pais/eliminarPais.php?id='

  country: Pais = new Pais()
  countriesList!: Pais[]
  countryDetails = new Pais()

  pageSize = 5
  since:number = 0
  to:number = 5

  getCountryByName(country: string){
    this.DataService.getCountriesByName(this.urlDataCountries, country).subscribe((data: Pais[]) =>{
      return this.countryDetails = data[0]
    })
  }
  
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

  save(pais: Pais){
    pais.estado_pais = 'activo'

    pais.id = pais.id_pais
    pais.nombre = pais.nombre_pais
    pais.estado = pais.estado_pais
    
    this.DataService.createCountries(this.urlCreateCountries, pais).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      console.log(this.country)
      console.log(data)
      this.refresh()
    })
  }

  edit(pais: Pais){
    pais.estado_pais = 'activo'

    pais.id = pais.id_pais
    pais.nombre = pais.nombre_pais
    pais.estado = pais.estado_pais

    this.DataService.editCountries(this.urlEditCountry, pais).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la iformación exitosamente!'
      })
      console.log(pais)
      console.log(data)
      this.refresh()
    })
  }
  
  deleted(id: any, pais:Pais){
    pais.id = this.countryDetails.id_pais

    this.DataService.deletedCity(this.urlDeleted, id).subscribe(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'La información fue eliminada con Exito!'
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

    this.DataService.getDataPais(this.urlDataCountries).subscribe((data: Pais[]) =>{
      this.countriesList = data
    })
  }

}
