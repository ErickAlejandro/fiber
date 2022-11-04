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

  urlCashBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar=&id_ciudad='+this.city
  urlgetBoxes = '/cajanivel1/filtrarCajaNivel1.php?filtrar='
  urlgetBoxes2 = '&id_ciudad='+this.city
  urlCreateBoxes = '/cajanivel1/crearCajaNivel1.php'
  urlEditCashBoxes = '/cajanivel1/editarCajaNivel1.php'
  urlDeletedBox = 'cajanivel1/eliminarCajaNivel1.php?id='
  
  urlValns = '/vlan/filtrarVlan.php?filtrar=&id_ciudad='+this.city

  boxes:CashBoxes = new CashBoxes();
  cashBoxesList!: CashBoxes[];
  cashDetail = new CashBoxes();
  filterPosVlan = ''

  vlansList!: Vlan[];
  flagOptions!: string
  selectVlan!: Vlan

  pageSize = 5
  since:number = 0
  to:number = 5

  cashBox!: CashBoxes

  constructor(private DataService: DataService, private store: Store, private router:Router) { 
    console.log('Component Implement')
    this.cashDetail
   }

   preSave(cashBoxes: CashBoxes){
    this.boxes = cashBoxes
   }

   preSaveEdit(cashBoxD: CashBoxes){
    this.cashDetail = cashBoxD
   }

   changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  addCashBox(cashBoxOne: CashBoxes[]){
    this.store.dispatch( new AddCashBoxOne(cashBoxOne))
  }

   save(cashBoxes:CashBoxes){
    this.boxes.estado_cajanivel1 = 'activo'
    this.boxes.id_ciudad = Number(this.city)

    if(cashBoxes.nombre_cajanivel1 == '' || cashBoxes.nombre_vlan == '' || cashBoxes.direccion_cajanivel1 == '' || cashBoxes.referencia_cajanivel1 == '' || cashBoxes.cantidadhilos_cajanivel1 == 0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    }else{
      this.DataService.createCashBox(this.urlCreateBoxes, cashBoxes).subscribe(data=>{
        if(JSON.stringify(data) == '{"respuesta":"La caja ya existe o vlan ocupada"}'){
          Swal.fire({
            icon: 'error',
            title: 'La caja ya existe o vlan ocupada',
            text: 'Cambiar nombre de caja o Vlan!',
          })
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Agregaste una nueva Caja de nivel-1!',
          })
          console.log(JSON.stringify(data))
          this.refresh()
        }
      }) 
    }
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

  getCashBoxByName(cashName:string){
    this.store.select(state => state.cashBoxOne.cashBoxOne).subscribe((data: CashBoxes[]) =>{
      this.cashDetail = data.filter((cashBoxOne) => cashBoxOne.nombre_cajanivel1 == cashName)[0]
    })
  }

  getCashBoxEdit(cashBox: string){
    this.DataService.getCashBoxByName(cashBox, this.urlgetBoxes, this.urlgetBoxes2).subscribe((data: CashBoxes[]) =>{
      this.cashDetail = data[0]
    })
  }

  editCashBox(cashBox: CashBoxes){

    if(cashBox.nombre_cajanivel1 == '' || cashBox.nombre_vlan == '' || cashBox.direccion_cajanivel1 == '' || cashBox.referencia_cajanivel1 == '' || cashBox.cantidadhilos_cajanivel1 == 0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
      })
    }else{
      this.DataService.editCashBoxLvlOne(this.urlEditCashBoxes, cashBox).subscribe(data =>{
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Editaste la información exitosamente!'
        })
        this.refresh()
      })
    }
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
      this.addCashBox(data)

      if(this.cashBoxesList == null){
        this.router.navigate(['/tabla-vacia'])
      }else{
        console.log('la tabla si tiene datos');
      }
    })
  }
}
