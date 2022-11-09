import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { Historial } from 'src/app/Models/historial';
import { Store } from '@ngxs/store';
import { AddHistorial } from 'src/app/store/historial/historial.actions';
import { PageEvent } from '@angular/material/paginator';
import * as CryptoJS from 'crypto-js'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8)

  constructor(private DataService: DataService, private store: Store, private router:Router) { }

  filterPosHistorial = ''
  

  public isLoading = false
  public src!: string
  public $data: any

  urlGetData = '/Historial_Servicio/filtrarHistorialServicio.php?id_ciudad='+ this.city
  historialList!: Historial[]
  historialListAux!: Historial[]

  pageSize = 5
  since:number = 0
  to:number = 5

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

  addHistorial(historial: Historial[]){
    this.store.dispatch(new AddHistorial(historial))
  }

  textoBuscar = ''
  onKey(event: any) { // without type info
    let buscarHistorialList: Historial[] = []

    if(this.textoBuscar.length != 0){
      this.historialListAux.forEach(element => {
    if(element.usuario_cliente.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || (element.id_cliente + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0){
          buscarHistorialList.push(element)
        }
      });
      this.historialList = null
      this.historialList = buscarHistorialList
    }else{
      this.historialList = this.historialListAux
    }
  }

  ngOnInit(): void {

    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })

    this.DataService.getDataHistorial(this.urlGetData).subscribe((data: Historial[]) =>{
      this.historialList = data
      this.historialListAux = data
      this.addHistorial(data)
      Swal.close()
      if(this.historialList == null){
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
