import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CashBoxes } from 'src/app/Models/cash-boxes';
import { Vlan } from 'src/app/Models/vlan';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash-boxes',
  templateUrl: './cash-boxes.component.html',
  styleUrls: ['./cash-boxes.component.css']
})
export class CashBoxesComponent implements OnInit {

  urlCashBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad=9'
  urlgetBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar='
  urlgetBoxes2 = '&id_ciudad=9'
  urlCreateBoxes = '/cajanivel1/crearCajaNivel1.php'
  urlEditCashBoxes = '/cajanivel1/editarCajaNivel1.php'
  urlDeletedBox = 'cajanivel1/eliminarCajaNivel1.php?id='
  
  urlValns = '/vlan/filtrarVlan.php?filtrar=&id_ciudad=9'

  boxes:CashBoxes = new CashBoxes();
  cashBoxesList!: CashBoxes[];
  cashDetail = new CashBoxes();

  vlansList!: Vlan[];

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService) { 
    console.log('Component Implement')
    this.cashDetail
   }

   changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

   save(cashBoxes:CashBoxes){
    this.boxes.estado_cajanivel1 = 'activo'
    this.boxes.id_ciudad = 9
    this.DataService.createCashBox(this.urlCreateBoxes, cashBoxes).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      console.log(this.boxes)
      this.refresh()
    })
   }

   refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  getDataVlan(){
    this.DataService.getDataVlans(this.urlValns).subscribe((data: Vlan[]) =>{
      this.vlansList = data
    })
  }

  getCashBoxByName(cash:string){
    this.DataService.getCashBoxByName(cash, this.urlgetBoxes,this.urlgetBoxes2).subscribe((data: CashBoxes[]) =>{
      return this.cashDetail = data[0]
    })
  }

  editCashBox(cashBox: CashBoxes){
    this.DataService.editCashBoxLvlOne(this.urlEditCashBoxes, cashBox).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  deletedCashBoxes(id:any){
    this.DataService.deletedCity(this.urlDeletedBox, id).subscribe(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
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

      this.getDataVlan()
      
    this.DataService.getDataCash(this.urlCashBoxes)
    .subscribe((data: CashBoxes[]) => {
      this.cashBoxesList = data
    })
  }
}
