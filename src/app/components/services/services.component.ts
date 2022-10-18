import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CashBoxesTwo } from 'src/app/Models/cash-boxes-two';
import { Clients } from 'src/app/Models/clients';
import { Ont } from 'src/app/Models/ont';
import { OntModels } from 'src/app/Models/ontModels';
import { Planes } from 'src/app/Models/planes';
import { Services } from 'src/app/Models/services';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  urlGetData = '/Servicio/filtrarServicio.php?filtrar=&id_ciudad=9'
  urlFirstPart = '/Servicio/buscarServicio.php?filtrar='
  urlSeconPart = '&id_ciudad=9'
  urlDeleted = '/Servicio/eliminarServicio.php?id&id_ciudad&id_cliente='
  urlCreateService = '/Servicio/crearServicio.php'
  urlFirst = '/Ont/filtrarOnt.php?filtrar='
  urlSecont = '&id_ciudad=9'

  urlDataClient = '/Clientes/filtrarClientes.php?filtrar=&id_ciudad=9'
  urlDataCashBox = '/cajanivel2/filtrarCajaNivel2.php?filtrar=&id_ciudad=9'
  urlDataModelOnt = '/Ont/filtrarOnt.php?filtrar=&id_ciudad=9'
  urlCreateOnt = '/Ont/crearOnt.php'
  urlPlanesData = '/Planes/filtrarPlanes.php?filtrar=&id_ciudad=9'

  servicesList!: Services[]
  serviceDetails = new Services()
  service: Services = new Services()

  clienteList!: Clients[]
  cajaList!: CashBoxesTwo[]
  ontList!: Ont[]
  ontDetails = new Ont()
  planList!: Planes[]

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService) { }

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

ClipBoard(input: any){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Texto copiado con Exito!',
      showConfirmButton: false,
      timer: 1000
    })

    input.select()
    document.execCommand('copy')
    input.setSelectRange(0,0)
  }

  save( service: Services){
    this.DataService.createService(this.urlCreateService, service).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste un nuevo Servicio y  una nueva ONT!'
      })
      console.log(service)
      console.log(data)
      this.refresh()
    })
  }

  getOntByName(ont: string){
    this.DataService.getOntByName(this.urlFirst, this.urlSecont, ont).subscribe((data: Ont[]) => {
      return this.ontDetails = data[0]
    })
  }

  getCaptureClient(){
    this.DataService.getDataClients(this.urlDataClient).subscribe((data: Clients[]) =>{
      this.clienteList = data
    })
  }
  getCaptureCashBoxTwo(){
    this.DataService.getDataCashBoxesTwo(this.urlDataCashBox).subscribe((data: CashBoxesTwo[]) => {
      this.cajaList = data
    })
  }
  getCaptureModelOnt(){
    this.DataService.getDataOnt(this.urlDataModelOnt).subscribe((data: Ont[]) =>{
      this.ontList = data
    })
  }
  getCapturePlan(){
    this.DataService.getDataPlanes(this.urlPlanesData).subscribe((data: Planes[]) => {
      this.planList = data
    })
  }

  deleted(id:any){
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
      })
      this.refresh()
    })
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  getServiceByName(service: string){
    this.DataService.getServiceByName(this.urlFirstPart, this.urlSeconPart, service).subscribe((data: Services[]) =>{
      return this.serviceDetails = data[0]
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
      this.getCaptureClient()
      this.getCaptureCashBoxTwo()
      this.getCaptureModelOnt()
      this.getCapturePlan()
      this.DataService.getDataService(this.urlGetData).subscribe((data: Services[]) =>{
        this.servicesList = data
      })
  }

}
