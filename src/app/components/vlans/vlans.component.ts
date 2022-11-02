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

  urlData = '/vlan/filtrarVlan.php?filtrar&id_ciudad='+this.city
  urlGetDataFirst = '/vlan/filtrarVlan.php?filtrar='
  urlGetDataSecond = '&id_ciudad='+this.city
  urlCreate = '/vlan/crearVlan.php'
  urlDeleted = '/vlan/eliminarVlan.php?id='

  vlan: Vlan = new Vlan()
  VlansList!: Vlan[];
  VlanDetails = new Vlan()

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService:DataService, private store: Store, private router:Router) { }

  public addVlans(vlans: Vlan[]){
    this.store.dispatch(new AddVlans(vlans))
  }

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

  getVlanByName(vlanName:string){
    this.store.select(state => state.vlans.vlans).subscribe((data: Vlan[]) => {
      this.VlanDetails = data.filter((vlan) => vlan.nombre_vlan == vlanName)[0]
      console.log(this.VlanDetails)
    })
  }

  getCashBoxesTwoEdit(vlan: string){
    this.DataService.getVlanByName(this.urlGetDataFirst, this.urlGetDataSecond, vlan).subscribe((data: Vlan[]) =>{
      this.VlanDetails = data[0]
    })
  }

  save(vlans:Vlan){
    this.vlan.id_ciudad = Number(this.city)
    this.vlan.estado_vlan = 'activo'
    this.vlan.buckle2 = 'null'
    this.vlan.ip_rangodireccionesip = 'null'
    this.DataService.createVlans(this.urlCreate, vlans).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!'
      })
      this.refresh()
    })
  }


  deleted(id:any){
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(data=>{
      Swal.fire({
        icon:'success',
        title: 'Felicitaciones',
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

    this.DataService.getData(this.urlData)
    .subscribe((data: Vlan[]) => {
      this.VlansList = data
      this.addVlans(data)

      if(this.VlansList == null){
        this.router.navigate(['/tabla-vacia'])
      }else{
        console.log('la tabla si tiene datos');
      }
    })
  }

}
