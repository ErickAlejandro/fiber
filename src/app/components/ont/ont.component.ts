import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Ont } from 'src/app/Models/ont';
import { OntModels } from 'src/app/Models/ontModels';
import { DataService } from 'src/app/services/data.service';
import { AddOnt } from 'src/app/store/ont/ont.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'app-ont',
  templateUrl: './ont.component.html',
  styleUrls: ['./ont.component.css']
})
export class OntComponent implements OnInit {

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  // city: any = this.userLogin.id_ciudad
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/Ont/filtrarOnt.php?filtrar=&id_ciudad='+this.city
  urlFirst = '/Ont/filtrarOnt.php?filtrar='
  urlSecont = '&id_ciudad='+this.city
  urlEditOnt = '/Ont/editarOnt.php'
  urlDeleted = '/Ont/eliminarOnt.php?id='

  urlModelOnt = '/ModeloOnt/filtrarModeloOnt.php?filtrar=&id_ciudad='+this.city

  ont: Ont = new Ont()
  ontList!: Ont[]
  ontDetails = new Ont()

  modelOntList!: OntModels[]

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService, private store: Store) { }

  public addOnts(onts: Ont[]){
    this.store.dispatch(new AddOnt(onts))
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

  getCaptureOntModel(){
if(this.userLogin.nombre_modelosont == 'ADMINISTRADOR'){
      this.DataService.getDataModelOnt(this.urlModelOnt, this.city).subscribe((data: OntModels[]) =>{
        this.modelOntList = data
      })
    }
  }

  getOntByName(ontName: string){
    this.store.select(state => state.onts.onts).subscribe((data: Ont[]) =>{
      this.ontDetails = data.filter((ont) => ont.serie_ont == ontName)[0]
      console.log(this.ontDetails)
    })
  }

  getOntByEdit(ont: string){
    this.DataService.getOntByName(this.urlFirst, this.urlSecont, ont).subscribe((data: Ont[]) =>{
      this.ontDetails = data[0]
    })
  }

  editOnl(ont: Ont){
    this.DataService.editOnt(this.urlEditOnt, ont).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  deleted(id:any){
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(resp =>{
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
    this.getCaptureOntModel()

    this.DataService.getDataOnt(this.urlGetData).subscribe((data: Ont[]) =>{
      this.ontList = data
      this.addOnts(data)
      
    })
  }

}
