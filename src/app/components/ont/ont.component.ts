import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { Ont } from 'src/app/Models/ont';
import { OntModels } from 'src/app/Models/ontModels';
import { DataService } from 'src/app/services/data.service';
import { AddOnt } from 'src/app/store/ont/ont.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';

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

  urlModelOnt = '/ModeloOnt/filtrarModeloOnt.php?filtrar=&id_ciudad='
  flagOptions!: string
  selectModel!: OntModels

  ont: Ont = new Ont()
  ontList!: Ont[]
  ontListAux!: Ont[]
  ontDetails = new Ont()

  modelOntList!: OntModels[]
  modelOntListAux!: OntModels[]

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService, private store: Store, private router:Router) { }

  public addOnts(onts: Ont[]){
    this.store.dispatch(new AddOnt(onts))
  }

  preSaveEdit(ontD: Ont){
    this.ontDetails = ontD
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
if(this.userLogin.nombrerol_rol == 'ADMINISTRADOR'){
      this.DataService.getDataModelOnt(this.urlModelOnt, this.city).subscribe((data: OntModels[]) =>{
        this.modelOntList = data
        this.modelOntListAux = data
      })
    }
  }

  textoBuscar = ''
  onKey(event: any) { // without type info
    let buscarOntList: Ont[] = []

    if(this.textoBuscar.length != 0){
      this.ontListAux.forEach(element => {
    if(element.serie_ont.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.nombre_modelosont.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.responsable_ont.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarOntList.push(element)
        }
      });
      this.ontList = null
      this.ontList = buscarOntList
    }else{
      this.ontList = this.ontListAux
    }
  }

  textoBuscarModelo = ''
  onKeyModel(event: any){
    let buscarModelList: OntModels[] = []

    if(this.textoBuscarModelo.length != 0){
      this.modelOntListAux.forEach(element => {
    if(element.nombre_modelosont.toLowerCase().indexOf(this.textoBuscarModelo.toLowerCase()) > -1 || element.tipo_modelosont.toLowerCase().indexOf(this.textoBuscarModelo.toLowerCase()) > -1 ){
          buscarModelList.push(element)
        }
      });
      this.modelOntList = null
      this.modelOntList = buscarModelList
    }else{
      this.modelOntList = this.modelOntListAux
    }
  }

  getOntByName(ontName: string){
    this.store.select(state => state.onts.onts).subscribe((data: Ont[]) =>{
      this.ontDetails = data.filter((ont) => ont.serie_ont == ontName)[0]
    })
  }

  getOntByEdit(ont: string){
    this.DataService.getOntByName(this.urlFirst, this.urlSecont, ont).subscribe((data: Ont[]) =>{
      this.ontDetails = data[0]
    })
  }

  editOnl(ont: Ont){

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })

    if(ont.serie_ont == '' || ont.nombre_modelosont == '' || ont.responsable_ont == ''){
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o es igual al anterior!',
      })
    }else{
      this.DataService.editOnt(this.urlEditOnt, ont).subscribe(data =>{
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Editaste la información exitosamente!'
        })
        this.refresh()
      })
    }
  }

  deleted(id:any){
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando informacion...',
      showConfirmButton: false,
    })
    this.DataService.deletedCity(this.urlDeleted, id).subscribe(resp =>{
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'La información fue eliminada con Exito!'
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
    this.getCaptureOntModel()

    this.DataService.getDataOnt(this.urlGetData).subscribe((data: Ont[]) =>{
      this.ontList = data
      this.ontListAux = data
      this.addOnts(data)
      Swal.close()
      if(this.ontList == null){
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
