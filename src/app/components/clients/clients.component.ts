import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Clients } from 'src/app/Models/clients';
import { DataService } from 'src/app/services/data.service';
import { AddClients } from 'src/app/store/clients/clients.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  dataJson: any;

  constructor(private DataServcies: DataService, private store: Store, private router: Router) { }

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetClients = '/Clientes/filtrarClientes.php?filtrar=&id_ciudad=' + this.city
  urlFirstPart = '/Clientes/filtrarClientes.php?filtrar='
  urlSecondPart = '&id_ciudad=' + this.city
  urlDeletedData = '/Clientes/eliminarClientes.php?id='
  urlCreateClients = '/Clientes/crearClientes.php'
  urlEditClients = '/Clientes/editarClientes.php'

  client: Clients = new Clients()
  clientsList!: Clients[]
  clientDetail = new Clients()

  textoBuscar = ''
  clientsListAux!: Clients[]

  pageSize = 5
  since: number = 0
  to: number = 5

  public addClients(clients: Clients[]) {
    this.store.dispatch(new AddClients(clients))
  }

  onKey(event: any) { // without type info
    let buscarClientList: Clients[] = []

    if(this.textoBuscar.length != 0){
      this.clientsListAux.forEach(element => {
    if(element.nombre_clientepersona.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || (element.cedula_clientepersona + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0 || element.apellido_clientepersona.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarClientList.push(element)
        }
      });
      this.clientsList = null
      this.clientsList = buscarClientList
    }else{
      this.clientsList = this.clientsListAux
    }
  }

  getClientByName(clientName: any) {
    this.store.select(state => state.clients.clients).subscribe((data: Clients[]) => {
      this.clientDetail = data.filter((client) => client.cedula_clientepersona == clientName)[0]
      console.log(this.clientDetail)
    })
  }

  getClientEdit(client: any) {
    this.DataServcies.getClientsByName(client, this.urlFirstPart, this.urlSecondPart).subscribe((data: Clients[]) => {
      return this.clientDetail = data[0]
    })
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

  save(clients: Clients) {
    clients.estado_clientepersona = 'activo'
    clients.id_ciudad = Number(this.city)

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando un nuevo Cliente',
      showConfirmButton: false,
      timerProgressBar: true
    })

    if (clients.cedula_clientepersona == 0 || clients.nombre_clientepersona == '' || clients.apellido_clientepersona == '' || clients.correo_clientepersona == '' || clients.telefono1_clientepersona == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    } else {
      this.DataServcies.getCreateClients(this.urlCreateClients, clients).subscribe(data => {
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
            text: 'Agregaste un nuevo Cliente!',
            showConfirmButton: false,
          })
          this.refresh()
        }
      })
    }
  }

  edit(client: Clients) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editar información',
      showConfirmButton: false,
    })

    if (client.nombre_clientepersona == '' || client.apellido_clientepersona == '' || client.correo_clientepersona == '' || client.telefono1_clientepersona == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o es igual al anterior!',
      })
    } else {
      this.DataServcies.editClients(client, this.urlEditClients).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))
        console.log(this.dataJson);
        if(this.dataJson['respuesta'] != 'ok'){
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        }else{
          Swal.close()
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
    this.DataServcies.deletedCity(this.urlDeletedData, id).subscribe(resp => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'El dato fue eliminado con Exito!'
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

    this.DataServcies.getDataClients(this.urlGetClients).subscribe((data: Clients[]) => {
      this.clientsList = data
      this.clientsListAux = data
      this.addClients(data)
      Swal.close()

      if (this.clientsList == null) {
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
