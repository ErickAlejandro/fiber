import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Vlan } from 'src/app/Models/vlan';
import { DataService } from 'src/app/services/data.service';
import { AddVlans } from 'src/app/store/vlan/vlan.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vlans',
  templateUrl: './vlans.component.html',
  styleUrls: ['./vlans.component.css']
})
export class VlansComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlData = '/vlan/filtrarVlan.php?filtrar&id_ciudad=' + this.city
  urlGetDataFirst = '/vlan/filtrarVlan.php?filtrar='
  urlGetDataSecond = '&id_ciudad=' + this.city
  urlCreate = '/vlan/crearVlan.php'
  urlDeleted = '/vlan/eliminarVlan.php?id='

  vlan: Vlan = new Vlan()
  VlansList!: Vlan[];
  VlanDetails = new Vlan()

  resultadoIP: any

  textoBuscar = ''
  vlansListAux!: Vlan[]

  pageSize = 5
  since: number = 0
  to: number = 5
  dataJson: any;

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  public addVlans(vlans: Vlan[]) {
    this.store.dispatch(new AddVlans(vlans))
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  validarIP(ip:string){
    let verdad = ip.split('.');
    if(verdad.length != 4)
      return false;
    for(let i in verdad){
      if(!/^\d+$/g.test(verdad[i])
      ||+verdad[i]>255
      ||+verdad[i]<0
      ||/^[0][0-9]{1,2}/.test(verdad[i]))
        return false;
    }
    return true
  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  onKey(event: any) { // without type info
    let buscarVlansList: Vlan[] = []

    if(this.textoBuscar.length != 0){
      this.vlansListAux.forEach(element => {
    if(element.nombre_vlan.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || (element.numeroolt_vlan + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0 || (element.tarjetaolt_vlan + '').toLowerCase().indexOf(this.textoBuscar.toLowerCase()) == 0){
          buscarVlansList.push(element)
        }
      });
      this.VlansList = null
      this.VlansList = buscarVlansList
    }else{
      this.VlansList = this.vlansListAux
    }
  }

  getVlanByName(vlanName: string) {
    this.store.select(state => state.vlans.vlans).subscribe((data: Vlan[]) => {
      this.VlanDetails = data.filter((vlan) => vlan.nombre_vlan == vlanName)[0]
      console.log(this.VlanDetails)
    })
  }

  getCashBoxesTwoEdit(vlan: string) {
    this.DataService.getVlanByName(this.urlGetDataFirst, this.urlGetDataSecond, vlan).subscribe((data: Vlan[]) => {
      this.VlanDetails = data[0]
    })
  }

  save(vlans: Vlan) {
    this.vlan.id_ciudad = Number(this.city)
    this.vlan.estado_vlan = 'activo'
    this.vlan.buckle2 = (Number(vlans.ipfin_vlan.toString().split('.')[3]) - Number(vlans.ipinicio_vlan.toString().split('.')[3]) + 1).toString()
    this.vlan.ip_rangodireccionesip = vlans.ipinicio_vlan.toString().split('.')[3]
    this.vlan.nombre_vlan = 'Vlan ' + this.vlan.numerovlan_vlan

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Guardando informaci??n...',
      showConfirmButton: false,
      timerProgressBar: true
    })

    if (vlans.numerovlan_vlan == 0 || vlans.numeroolt_vlan == 0 || vlans.tarjetaolt_vlan == 0 || vlans.puertoolt_vlan == 0 || vlans.ipinicio_vlan == 0 || vlans.ipfin_vlan == 0 || vlans.mascara_vlan == 0 || vlans.gateway_vlan == 0) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o es igual al anterior!',
      })
    } else {
      if(this.validarIP(vlans.ipinicio_vlan.toString()) != true || this.validarIP(vlans.ipfin_vlan.toString()) != true || this.validarIP(vlans.gateway_vlan.toString()) != true){
        Swal.close()
        console.log(this.validarIP(vlans.ipinicio_vlan.toString()));
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal!',
          text: 'La IP ingresada no es correcta',
        })
      }else{
        let descompuestaInicial: string[] = vlans.ipinicio_vlan.toString().split('.')
        let descompuestaFinal: string[] = vlans.ipfin_vlan.toString().split('.')
        if(descompuestaInicial[3] >= descompuestaFinal[3]){
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: 'El rango de la IP inicial no puede ser mayor o igual a la IP Final',
          })
        }else{
          this.DataService.createVlans(this.urlCreate, vlans).subscribe(data => {
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
                text: 'Agregaste una nueva VLan!',
                showConfirmButton: false,
              })
              location.reload()
            }
          })
        }
      }
    }
  }


  deleted(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminado dato...',
      showConfirmButton: false,
      timerProgressBar: true
    })
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(data => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'El dato fue eliminado con Exito!',
        showConfirmButton: false,
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

    this.DataService.getData(this.urlData)
      .subscribe((data: Vlan[]) => {
        this.VlansList = data
        this.vlansListAux = data
        this.addVlans(data)
        Swal.close()
        if (this.VlansList == null) {
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
