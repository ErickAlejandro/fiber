import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { CashBoxes } from 'src/app/Models/cash-boxes';
import { CashBoxesTwo } from 'src/app/Models/cash-boxes-two';
import { DataService } from 'src/app/services/data.service';
import { AddCashBoxTwo } from 'src/app/store/cash-box-two/cash-box-two.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-boxes-two',
  templateUrl: './cash-boxes-two.component.html',
  styleUrls: ['./cash-boxes-two.component.css']
})
export class CashBoxesTwoComponent implements OnInit {
  dataJson: any;

  constructor(private DataServices: DataService, private store: Store, private router: Router) { }

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/cajanivel2/filtrarCajaNivel2.php?filtrar=&id_ciudad=' + this.city
  urlFirstPart = '/cajanivel2/filtrarCajaNivel2.php?filtrar='
  urlSecondPart = '&id_ciudad=' + this.city
  urlCreateData = '/cajanivel2/crearCajaNivel2.php'
  urlDelet = '/cajanivel2/eliminarCajaNivel2.php?id='
  urlEdit = '/cajanivel2/editarCajaNivel2.php'

  urlCashBoxOne = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad=' + this.city

  boxes: CashBoxesTwo = new CashBoxesTwo();
  cashBoxesTwoList!: CashBoxesTwo[];
  CashDetails = new CashBoxesTwo();

  cashBoxLevelOne!: CashBoxes[];

  flagOptions!: string
  selectCashBoxOne!: CashBoxes
  filterPosCashBoxOne = ''

  pageSize = 5
  since: number = 0
  to: number = 5

  textoBuscar = ''
  cashBoxesTwoListAux!: CashBoxesTwo[]

  onKey(event: any) { // without type info
    let buscarCashBoxesTwo: CashBoxesTwo[] = []

    if(this.textoBuscar.length != 0){
      this.cashBoxesTwoListAux.forEach(element => {
    if(element.nombre_cajanivel2.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.direccion_cajanivel2.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.abreviatura_cajanivel2.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarCashBoxesTwo.push(element)
        }
      });
      this.cashBoxesTwoList = null
      this.cashBoxesTwoList = buscarCashBoxesTwo
    }else{
      this.cashBoxesTwoList = this.cashBoxesTwoListAux
    }
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

  preSave(cashBoxesTwo: CashBoxesTwo) {
    this.boxes = cashBoxesTwo
  }

  preSaveEdit(cashBoxesTwoD: CashBoxesTwo) {
    this.CashDetails = cashBoxesTwoD
  }

  public addCashBoxesTwo(cashBoxesTwo: CashBoxesTwo[]) {
    this.store.dispatch(new AddCashBoxTwo(cashBoxesTwo))
  }

  save(cashBox: CashBoxesTwo) {
    this.boxes.estado_cajanivel2 = 'activo'
    this.boxes.id_ciudad = Number(this.city)

    Swal.fire({
      icon: 'info',
      title: 'Ejecuando',
      text: 'Creando una nueva caja de Nivel-2...',
      showConfirmButton: false,
    })

    if (cashBox.nombre_cajanivel2 == '' || cashBox.nombre_cajanivel1 == '' || cashBox.abreviatura_cajanivel2 == '' || cashBox.direccion_cajanivel2 == '' || cashBox.referencia == '' || cashBox.cantidadhilos_cajanivel2 == 0) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Compruebe los datos ingrersados!',
      })
    } else {
      this.DataServices.createCashBoxTwo(this.urlCreateData, cashBox).subscribe(data => {
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
            text: 'Agregaste una nueva Caja de Nivel-2!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  getDataCashBoxOne() {
    this.DataServices.getDataCash(this.urlCashBoxOne).subscribe((data: CashBoxes[]) => {
      this.cashBoxLevelOne = data
    })
  }

  getCashBoxesTwoByName(cashName: string) {
    this.store.select(state => state.cashBoxesTwo.cashBoxesTwo).subscribe((data: CashBoxesTwo[]) => {
      this.CashDetails = data.filter((cashBoxTwo) => cashBoxTwo.nombre_cajanivel2 == cashName)[0]
      console.log(this.CashDetails)
    })
  }

  getCashBoxesTwoEdit(cashBoxTwo: string) {
    this.DataServices.getCashBoxByNameTwo(this.urlFirstPart, this.urlSecondPart, cashBoxTwo).subscribe((data: CashBoxesTwo[]) => {
      this.CashDetails = data[0]
    })
  }

  edit(cashBoxTwo: CashBoxesTwo) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecuando',
      text: 'Editando informacion...',
      showConfirmButton: false,
    })
    if (cashBoxTwo.nombre_cajanivel2 == '' || cashBoxTwo.nombre_cajanivel1 == '' || cashBoxTwo.abreviatura_cajanivel2 == '' || cashBoxTwo.direccion_cajanivel2 == '' || cashBoxTwo.referencia == '' || cashBoxTwo.cantidadhilos_cajanivel2 == 0) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra incorrecto o es igual al anterior!',
      })
    } else {
      this.DataServices.editCashBoxLvlTwo(this.urlEdit, cashBoxTwo).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))
        console.log(this.dataJson);
        if(this.dataJson['respuesta'] != 'error en la edicion editar-cajanivel2'){
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Editaste la informaci??n exitosamente!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  delet(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecuando',
      text: 'Eliminado informacion...',
      showConfirmButton: false,
      timerProgressBar: true
    })
    this.DataServices.deletedCity(this.urlDelet, id).subscribe(resp => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
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

    this.getDataCashBoxOne()
    this.DataServices.getDataCashBoxesTwo(this.urlGetData).subscribe((data: CashBoxesTwo[]) => {
      this.cashBoxesTwoList = data
      this.cashBoxesTwoListAux = data
      this.addCashBoxesTwo(data)
      Swal.close()

      if (this.cashBoxesTwoList == null) {
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
