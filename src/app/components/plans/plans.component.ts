import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Planes } from 'src/app/Models/planes';
import { DataService } from 'src/app/services/data.service';
import { AddPlans } from 'src/app/store/plans/plans.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlgetData = '/Planes/filtrarPlanes.php?filtrar=&id_ciudad=' + this.city
  urlFirstPart = '/Planes/filtrarPlanes.php?filtrar='
  urlSecondPart = '&id_ciudad=' + this.city
  urlCreatePlans = '/Planes/crearPlanes.php'
  urlDeleted = '/Planes/eliminarPlanes.php?id='
  urlEditPlans = '/Planes/editarPlanes.php'

  plans: Planes = new Planes()
  plansList!: Planes[]
  plansDetail = new Planes()

  textoBuscar = ''
  plansListAux!: Planes[]

  pageSize = 5
  since: number = 0
  to: number = 5
  dataJson: any;

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  addPlans(plans: Planes[]) {
    this.store.dispatch(new AddPlans(plans))
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })

    this.DataService.getData(this.urlgetData)
      .subscribe((data: Planes[]) => {
        this.plansList = data
        this.plansListAux = data
        this.addPlans(data)
        Swal.close()
        if (this.plansList == null) {
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

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  onKey(event: any) { // without type info
    let buscarPlansList: Planes[] = []

    if(this.textoBuscar.length != 0){
      this.plansListAux.forEach(element => {
    if(element.nombre_planes.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarPlansList.push(element)
        }
      });
      this.plansList = null
      this.plansList = buscarPlansList
    }else{
      this.plansList = this.plansListAux
    }
  }

  save(plans: Planes) {
    plans.estado_planes = 'activo'
    plans.id_ciudad = Number(this.city)

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando nuevo Plan...',
      showConfirmButton: false,
    })

    if (plans.nombre_planes == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio!',
        showConfirmButton: false,
      })
    } else {
      this.DataService.createPlans(this.urlCreatePlans, plans).subscribe(data => {
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
            text: 'Agregaste un nuevo Plan',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  edit(plans: Planes) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })

    if (plans.nombre_planes == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error de edición',
        text: 'Algun dato se encuentra vacio o es el mismo que el anterior!',
      })
    } else {
      this.DataService.editPlans(plans, this.urlEditPlans).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))

        if (this.dataJson['respuesta'] != 'ok') {
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

  deleted(id: any) {
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
        text: 'La información fue eliminada con Exito!',
        showConfirmButton: false,
      })
      location.reload()
    })
  }

  getPlanByName(planName: String) {
    this.store.select(state => state.plans.plans).subscribe((data: Planes[]) => {
      this.plansDetail = data.filter((plan) => plan.nombre_planes == planName)[0]
      console.log(this.plansDetail)
    })
  }

  getPlansByEdit(plans: string) {
    this.DataService.getPlansByName(plans, this.urlFirstPart, this.urlSecondPart).subscribe((data: Planes[]) => {
      return this.plansDetail = data[0]
    })
  }
}
