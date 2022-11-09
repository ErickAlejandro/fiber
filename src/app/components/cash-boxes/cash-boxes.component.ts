import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { CashBoxes } from 'src/app/Models/cash-boxes';
import { Vlan } from 'src/app/Models/vlan';
import { DataService } from 'src/app/services/data.service';
import { AddCashBoxOne } from 'src/app/store/cash-box-one/cash-box-one.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-boxes',
  templateUrl: './cash-boxes.component.html',
  styleUrls: ['./cash-boxes.component.css']
})
export class CashBoxesComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlCashBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad=' + this.city
  urlgetBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar='
  urlgetBoxes2 = '&id_ciudad=' + this.city
  urlCreateBoxes = '/cajanivel1/crearCajaNivel1.php'
  urlEditCashBoxes = '/cajanivel1/editarCajaNivel1.php'
  urlDeletedBox = 'cajanivel1/eliminarCajaNivel1.php?id='

  urlValns = '/vlan/filtrarVlan.php?filtrar=&id_ciudad=' + this.city

  boxes: CashBoxes = new CashBoxes();
  cashBoxesList!: CashBoxes[];
  cashBoxesListAux!: CashBoxes[]
  cashDetail = new CashBoxes();
  filterPosVlan = ''

  vlansList!: Vlan[];
  flagOptions!: string
  selectVlan!: Vlan

  pageSize = 5
  since: number = 0
  to: number = 5

  cashBox!: CashBoxes
  dataJson: any;

  textoBuscar = ''

  constructor(private DataService: DataService, private store: Store, private router: Router) {
    console.log('Component Implement')
    this.cashDetail
  }

  onKey(event: any){
    let buscarCashBoxList: CashBoxes[] = []

    if(this.textoBuscar.length != 0){
      this.cashBoxesListAux.forEach(element => {
    if(element.nombre_cajanivel1.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.direccion_cajanivel1.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.abreviatura_cajanivel1.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarCashBoxList.push(element)
        }
      });
      this.cashBoxesList = null
      this.cashBoxesList = buscarCashBoxList
    }else{
      this.cashBoxesList = this.cashBoxesListAux
    }
  }

  preSave(cashBoxes: CashBoxes) {
    this.boxes = cashBoxes
  }

  preSaveEdit(cashBoxD: CashBoxes) {
    this.cashDetail = cashBoxD
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  addCashBox(cashBoxOne: CashBoxes[]) {
    this.store.dispatch(new AddCashBoxOne(cashBoxOne))
  }

  save(cashBoxes: CashBoxes) {
    this.boxes.estado_cajanivel1 = 'activo'
    this.boxes.id_ciudad = Number(this.city)
    Swal.fire({
      icon: 'info',
      title: 'Ejecuando',
      text: 'Creando una nueva caja de nivel-1',
      showConfirmButton: false,
      timerProgressBar: true
    })

    if (cashBoxes.nombre_cajanivel1 == '' || cashBoxes.nombre_vlan == '' || cashBoxes.direccion_cajanivel1 == '' || cashBoxes.referencia_cajanivel1 == '' || cashBoxes.cantidadhilos_cajanivel1 == 0) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    } else {
      this.DataService.createCashBox(this.urlCreateBoxes, cashBoxes).subscribe(data => {
        if (JSON.stringify(data) == '{"respuesta":"La caja ya existe o vlan ocupada"}') {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'La caja ya existe o vlan ocupada',
            text: 'Cambiar nombre de caja o Vlan!',
          })
        } else {
          Swal.close()
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Agregaste una nueva Caja de nivel-1!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  getDataVlan() {
    this.DataService.getDataVlans(this.urlValns).subscribe((data: Vlan[]) => {
      this.vlansList = data
    })
  }

  getCashBoxByName(cashName: string) {
    this.store.select(state => state.cashBoxOne.cashBoxOne).subscribe((data: CashBoxes[]) => {
      this.cashDetail = data.filter((cashBoxOne) => cashBoxOne.nombre_cajanivel1 == cashName)[0]
    })
  }

  getCashBoxEdit(cashBox: string) {
    this.DataService.getCashBoxByName(cashBox, this.urlgetBoxes, this.urlgetBoxes2).subscribe((data: CashBoxes[]) => {
      this.cashDetail = data[0]
    })
  }

  editCashBox(cashBox: CashBoxes) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando informacion...',
      showConfirmButton: false,
      timerProgressBar: true
    })
    if (cashBox.nombre_cajanivel1 == '' || cashBox.nombre_vlan == '' || cashBox.direccion_cajanivel1 == '' || cashBox.referencia_cajanivel1 == '' || cashBox.cantidadhilos_cajanivel1 == 0) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato no es correcto o es igual al Anterior!',
      })
    } else {
      this.DataService.editCashBoxLvlOne(this.urlEditCashBoxes, cashBox).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))

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
            text: 'Editaste la información exitosamente!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  deletedCashBoxes(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando informacion...',
      showConfirmButton: false,
    })
    this.DataService.deletedCity(this.urlDeletedBox, id).subscribe(res => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
        showConfirmButton: false,
      })
      this.refresh()
    })
  }

  ngOnInit(): void {

    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })

    this.getDataVlan()

    this.DataService.getDataCash(this.urlCashBoxes)
      .subscribe((data: CashBoxes[]) => {
        this.cashBoxesList = data
        this.cashBoxesListAux = data
        this.addCashBox(data)
        Swal.close()
        if (this.cashBoxesList == null) {
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
