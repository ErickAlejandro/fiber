import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Cities } from 'src/app/Models/cities';
import { Pronvinces } from 'src/app/Models/provinces';
import { DataService } from 'src/app/services/data.service';
import { AddCities } from 'src/app/store/cities/cities.actions';
import { AddProvinces } from 'src/app/store/provinces/provinces.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save-cities',
  templateUrl: './save-cities.component.html',
  styleUrls: ['./save-cities.component.css']
})
export class SaveCitiesComponent implements OnInit {

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  citiesList!: Cities[];
  cityDetail = new Cities();
  city: Cities = new Cities();
  provinceDetail!: Pronvinces[]
  filterPosProvinces = ''

  urlCreateCity = 'ciudad/crearCiudad.php'
  urlCities = 'ciudad/filtrarCiudad.php?filtrar='
  urlGetDataProvincia = '/provincia/filtrarProvincia.php?filtrar='

  save(city: Cities) {
    city.estado_ciudad = 'activo'
    this.DataService.createCity(city, this.urlCreateCity).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      this.router.navigate(['ciudades'])
    })
  }
  
  public addCities(cities: Cities[]) {
    this.store.dispatch(new AddCities(cities));
  }

  public addProvinces(provinces: Pronvinces[]){
    this.store.dispatch(new AddProvinces(provinces))
  }

  ngOnInit(): void {

    this.DataService.getData(this.urlCities)
      .subscribe((data: Cities[]) => {
        this.citiesList = data
        this.addCities(data)
      })

    this.DataService.getDataProvinces(this.urlGetDataProvincia).subscribe((data: Pronvinces[]) => {
      this.provinceDetail = data
      this.addProvinces(data)
    })

  }

}
