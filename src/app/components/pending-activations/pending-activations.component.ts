import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Services } from 'src/app/Models/services';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-activations',
  templateUrl: './pending-activations.component.html',
  styleUrls: ['./pending-activations.component.css']
})
export class PendingActivationsComponent implements OnInit {
  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  city: any = this.userLogin.id_ciudad
  urlGetData = '/Servicio/filtrarServicioPendienteAdmin.php?id_ciudad='+this.city
  urlFirstPart = '/Servicio/filtrarServicioPendienteAdmin.php?filtrar='
  urlSeconPart = '&id_ciudad='+this.city

  serviceList!: Services[]
  serviceDetails = new Services()

  pageSize = 5
  since: number = 0
  to: number = 5

  comandoCopy: string = ''

  constructor(private DataService: DataService) { }


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
      timer: 1000,
      timerProgressBar: true
    })

    this.DataService.getDataClients(this.urlGetData).subscribe((data: Services[]) => {
      this.serviceList = data
    })
  }
}
