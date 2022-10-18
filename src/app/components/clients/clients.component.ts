import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Clients } from 'src/app/Models/clients';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private DataServcies: DataService) { }

  urlGetClients = '/Clientes/filtrarClientes.php?filtrar=&id_ciudad=9'
  urlFirstPart = '/Clientes/filtrarClientes.php?filtrar='
  urlSecondPart = '&id_ciudad=9'
  urlDeletedData = '/Clientes/eliminarClientes.php?id='
  urlCreateClients = '/Clientes/crearClientes.php'
  urlEditClients = '/Clientes/editarClientes.php'

  client: Clients = new Clients()
  clientsList!: Clients[]
  clientDetail = new Clients()

  pageSize = 5
  since:number = 0
  to:number = 5

  getClientByName(client: any) {
    this.DataServcies.getClientsByName(client, this.urlFirstPart, this.urlSecondPart).subscribe((data: Clients[]) => {
      return this.clientDetail = data[0]
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

  save(clients:Clients){
    clients.estado_clientepersona = 'activo'
    clients.id_ciudad = 9
    this.DataServcies.getCreateClients(this.urlCreateClients, clients).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste un nuevo Cliente!'
      })
      this.refresh()
    })
  }

  edit(client:Clients){
    this.DataServcies.editClients(client, this.urlEditClients).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  deleted(id: any) {
    this.DataServcies.deletedCity(this.urlDeletedData, id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'El dato fue eliminado con Exito!'
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

    this.DataServcies.getDataClients(this.urlGetClients).subscribe((data: Clients[]) => {
      this.clientsList = data
    })
  }

}
