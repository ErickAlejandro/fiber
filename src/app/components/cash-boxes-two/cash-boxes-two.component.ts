import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { CashBoxes } from 'src/app/Models/cash-boxes';
import { CashBoxesTwo } from 'src/app/Models/cash-boxes-two';
import { DataService } from 'src/app/services/data.service';
import { AddCashBoxTwo } from 'src/app/store/cash-box-two/cash-box-two.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-cash-boxes-two',
  templateUrl: './cash-boxes-two.component.html',
  styleUrls: ['./cash-boxes-two.component.css']
})
export class CashBoxesTwoComponent implements OnInit {

  constructor(private DataServices: DataService, private store:Store) { }

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/cajanivel2/filtrarCajaNivel2.php?filtrar=&id_ciudad='+this.city
  urlFirstPart = '/cajanivel2/filtrarCajaNivel2.php?filtrar='
  urlSecondPart = '&id_ciudad='+this.city
  urlCreateData = '/cajanivel2/crearCajaNivel2.php'
  urlDelet = '/cajanivel2/eliminarCajaNivel2.php?id='
  urlEdit = '/cajanivel2/editarCajaNivel2.php'

  urlCashBoxOne = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad='+this.city

  boxes: CashBoxesTwo = new CashBoxesTwo();
  cashBoxesTwoList!: CashBoxesTwo[];
  CashDetails = new CashBoxesTwo();

  cashBoxLevelOne!: CashBoxes[];

  flagOptions!: string
  selectCashBoxOne!: CashBoxes
  filterPosCashBoxOne = ''

  pageSize = 5
  since:number = 0
  to:number = 5

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

  preSave(cashBoxesTwo: CashBoxesTwo){
    this.boxes = cashBoxesTwo
  }

  preSaveEdit(cashBoxesTwoD: CashBoxesTwo){
    this.CashDetails = cashBoxesTwoD
  }

  public addCashBoxesTwo(cashBoxesTwo: CashBoxesTwo[]){
    this.store.dispatch(new AddCashBoxTwo(cashBoxesTwo))
  }

  save(cashBox: CashBoxesTwo){
    this.boxes.estado_cajanivel2 = 'activo'
    this.boxes.id_ciudad = Number(this.city)
    this.DataServices.createCashBoxTwo(this.urlCreateData, cashBox).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      this.refresh()
    })
  }

  getDataCashBoxOne(){
    this.DataServices.getDataCash(this.urlCashBoxOne).subscribe((data: CashBoxes[]) =>{
      this.cashBoxLevelOne = data
    })
  }

  getCashBoxesTwoByName(cashName: string){
    this.store.select(state => state.cashBoxesTwo.cashBoxesTwo).subscribe((data: CashBoxesTwo[])=>{
      this.CashDetails = data.filter((cashBoxTwo) => cashBoxTwo.nombre_cajanivel2 == cashName)[0]
      console.log(this.CashDetails)
    })
  }

  getCashBoxesTwoEdit(cashBoxTwo: string){
    this.DataServices.getCashBoxByNameTwo(this.urlFirstPart, this.urlSecondPart, cashBoxTwo).subscribe((data: CashBoxesTwo[]) =>{
      this.CashDetails = data[0]
    })
  }

  edit(cashBoxTwo: CashBoxesTwo){
    this.DataServices.editCashBoxLvlTwo(this.urlEdit, cashBoxTwo).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  delet(id: any){
    this.DataServices.deletedCity(this.urlDelet, id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
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

      this.getDataCashBoxOne()
      this.DataServices.getDataCashBoxesTwo(this.urlGetData).subscribe((data: CashBoxesTwo[]) =>{
        this.cashBoxesTwoList = data
        this.addCashBoxesTwo(data)
      })
  }

}
