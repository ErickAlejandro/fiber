import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { CashBoxesTwo } from 'src/app/Models/cash-boxes-two';
import { Clients } from 'src/app/Models/clients';
import { Ont } from 'src/app/Models/ont';
import { OntModels } from 'src/app/Models/ontModels';
import { Planes } from 'src/app/Models/planes';
import { Services } from 'src/app/Models/services';
import { DataService } from 'src/app/services/data.service';
import { ADdServices } from 'src/app/store/services/services.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/Servicio/filtrarServicio.php?filtrar=&id_ciudad='+this.city
  urlFirstPart = '/Servicio/buscarServicio.php?filtrar='
  urlSeconPart = '&id_ciudad='+this.city

  urlEditService = '/Servicio/editarServicio.php'
  urlDeletedSecont = '&id_ciudad='+this.city

  urlCreateService = '/Servicio/crearServicio.php'
  urlFirst = '/Ont/filtrarOnt.php?filtrar='
  urlSecont = '&id_ciudad='+this.city


  flagOptions!: string
  filterPosClients = ''
  filterPosCashBox2 = ''
  selectClient!: Clients
  clientDetails = new Clients()

  urlDataClient = '/Clientes/filtrarClientes.php?filtrar=&id_ciudad='+this.city
  urlDataCashBox = '/cajanivel2/filtrarCajaNivel2.php?filtrar=&id_ciudad='+this.city
  urlDataModelOnt = '/Ont/filtrarOnt.php?filtrar=&id_ciudad='+this.city
  urlCreateOnt = '/Ont/crearOnt.php'
  urlPlanesData = '/Planes/filtrarPlanes.php?filtrar=&id_ciudad='+this.city

  servicesList!: Services[]
  serviceDetails = new Services()
  service: Services = new Services()

  clienteList!: Clients[]

  cajaList!: CashBoxesTwo[]
  ontList!: Ont[]
  ontDetails = new Ont()
  planList!: Planes[]

  textoBuscar = ''
  servicesListAux!: Services[]

  pageSize = 5
  since:number = 0
  to:number = 5

  dataJson:any
  constructor(private DataService: DataService, private store: Store, private router:Router) { }

  addServices(services: Services[]){
    this.store.dispatch(new ADdServices(services))
  }

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

  preSave(services: Services){
    this.service = services
  }

  preSaveEdit(servicesD: Services){
    this.serviceDetails = servicesD
  }

  save( service: Services){
    
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando un nuevo servicio...',
      showConfirmButton: false,
    })


    this.DataService.createService(this.urlCreateService, service).subscribe(data =>{
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
          timer:2000,
          title: 'Felicidades',
          text: 'Agregaste un nuevo Servicio y  una nueva ONT!',
          showConfirmButton: false,
        })
        location.reload()
      }
    })
  }

  getOntByName(ont: string){
    this.DataService.getOntByName(this.urlFirst, this.urlSecont, ont).subscribe((data: Ont[]) => {
      return this.ontDetails = data[0]
    })
  }

  onKey(event: any) { // without type info
    let buscarServiceList: Services[] = []

    if(this.textoBuscar.length != 0){
      this.servicesListAux.forEach(element => {
    if(element.nombre_usuario.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || (element.id_cliente + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0
    || element.nombre_clientepersona.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarServiceList.push(element)
        }
      });
      this.servicesList = null
      this.servicesList = buscarServiceList
    }else{
      this.servicesList = this.servicesListAux
    }
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
  

  changeState(service:any){
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })
    service.estado_cliente = "pendiente"
    service.opcion_cliente = "eliminar"

    let hoy:any = Date.now()
    hoy = moment(hoy).format("yyyy-MM-DD HH:mm:ss");
    service.date2 = hoy
    console.log(service.date2);
    service.comando_copiar_cliente = service.eliminarservicio_cliente + '@' + service.interfazponcard_cliente + '@' + service.eliminaront_cliente
    
    this.DataService.editService(this.urlEditService, service).subscribe(res =>{
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
      })
      location.reload()
    })
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  getServiceByName(serviceName: string){
    this.store.select(state => state.services.services).subscribe((data: Services[]) =>{
      this.serviceDetails = data.filter((service) => service.id_cliente == serviceName)[0]
    })
  }

  getServiceEdit(service: string){
    this.DataService.getServiceByName(this.urlFirstPart, this.urlSeconPart, service).subscribe((data: Services[]) =>{
      return this.serviceDetails = data[0]
    })
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
      })
      this.getCaptureClient()
      this.getCaptureCashBoxTwo()
      this.getCaptureModelOnt()
      this.getCapturePlan()

      this.DataService.getDataService(this.urlGetData).subscribe((data: Services[]) =>{
        this.servicesList = data
        this.servicesListAux = data
        this.addServices(data)
        Swal.close()
        
        if(this.servicesList == null){
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
