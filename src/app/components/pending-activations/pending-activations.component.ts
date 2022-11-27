import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Services } from 'src/app/Models/services';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';  
import { Store } from '@ngxs/store';
import { ADdServices } from 'src/app/store/services/services.actions';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-pending-activations',
  templateUrl: './pending-activations.component.html',
  styleUrls: ['./pending-activations.component.css']
})
export class PendingActivationsComponent implements OnInit {
  constructor(private DataService: DataService, private store:Store, private route:Router) { }

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/Servicio/filtrarServicioPendienteAdmin.php?id_ciudad='+this.city
  urlFirstPart = '/Servicio/filtrarServicioPendienteAdmin.php?filtrar='
  urlSeconPart = '&id_ciudad='+this.city

  urlDeletedFirst = 'Servicio/eliminarServicio.php?id='
  urlDeletedSecont = '&id_ciudad='+this.city

  urlEdit = '/Servicio/editarServicio.php'
  dataJson:any

  serviceList!: Services[]
  serviceDetails = new Services()

  pageSize = 5
  since: number = 0
  to: number = 5
  

  comandoCopy: string = ''
  textoBuscar = ''
  serviceListAux!: Services[]



  copyComands(comando: string){

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Texto copiado con Exito!',
      showConfirmButton: false,
      timer: 1000
    })

    this.comandoCopy = comando.replace(/@/gi, '\n')
  }

  addServices(services: Services[]){
    this.store.dispatch(new ADdServices(services))
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  editSatate(service: Services){

    Swal.fire({
      icon: 'info',
      title: 'Cargando',
      showConfirmButton: false,
      timerProgressBar: true
    })
    
    this.DataService.editService(this.urlEdit, service).subscribe(data=>{
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
          timer: 2000,
          title: 'Felicidades',
          showConfirmButton: false,
          text: 'Servicio Activado!',
        })
        location.reload()
      }
    })
  }

  onKey(event: any) { // without type info
    let buscarServiceList: Services[] = []

    if(this.textoBuscar.length != 0){
      this.serviceListAux.forEach(element => {
    if(element.usuario_cliente.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || (element.id_cliente + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0 ||
    element.opcion_cliente.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarServiceList.push(element)
        }
      });
      this.serviceList = null
      this.serviceList = buscarServiceList
    }else{
      this.serviceList = this.serviceListAux
    }
  }

  changeState(){
    this.serviceDetails.estado_cliente = 'activo'
    this.editSatate(this.serviceDetails)
  }

  deleteService(id:any){
    this.DataService.deleteService(this.urlDeletedFirst, id, this.urlDeletedSecont).subscribe(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
      })
      this.refresh()
    })
  }

  getActivationsByService(id:any){
    this.store.select(state => state.services.services).subscribe((data: Services[]) =>{
      this.serviceDetails = data.filter((service) => service.id == id)[0]
    })
  }
  
  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;

  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })
    
    this.DataService.getDataClients(this.urlGetData).subscribe((data: Services[]) => {
      this.serviceList = data
      this.serviceListAux = data
      this.addServices(data)
      this.dataJson = JSON.parse(JSON.stringify(data))
      Swal.close()
      
      if(this.serviceList == null){
        Swal.fire({
          icon: 'info',
          title: 'La tabla esta vacia',
          timer: 2000,
          showConfirmButton: false,
        })
      }else{
        console.log('la tabla si tiene datos');
      }

    })

  }
}
