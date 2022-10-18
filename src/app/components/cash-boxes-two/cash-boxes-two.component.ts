import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CashBoxes } from 'src/app/Models/cash-boxes';
import { CashBoxesTwo } from 'src/app/Models/cash-boxes-two';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash-boxes-two',
  templateUrl: './cash-boxes-two.component.html',
  styleUrls: ['./cash-boxes-two.component.css']
})
export class CashBoxesTwoComponent implements OnInit {

  constructor(private DataServices: DataService) { }

  urlGetData = '/cajanivel2/filtrarCajaNivel2.php?filtrar=&id_ciudad=9'
  urlFirstPart = '/cajanivel2/filtrarCajaNivel2.php?filtrar='
  urlSecondPart = '&id_ciudad=9'
  urlCreateData = '/cajanivel2/crearCajaNivel2.php'
  urlDelet = '/cajanivel2/eliminarCajaNivel2.php?id='
  urlEdit = '/cajanivel2/editarCajaNivel2.php'

  urlCashBoxOne = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad=9'

  boxes: CashBoxesTwo = new CashBoxesTwo();
  cashBoxesTwoList!: CashBoxesTwo[];
  CashDetails = new CashBoxesTwo();

  cashBoxLevelOne!: CashBoxes[];

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

  save(cashBox: CashBoxesTwo){
    this.boxes.estado_cajanivel2 = 'activo'
    this.boxes.id_ciudad = 9
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

  getCashBoxesTwoByName(cash: string){
    this.DataServices.getCashBoxByNameTwo(this.urlFirstPart, this.urlSecondPart, cash).subscribe((data: CashBoxesTwo[]) => {
      return this.CashDetails = data[0]
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
      })
  }

}
