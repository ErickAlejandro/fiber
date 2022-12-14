import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { OntModels } from 'src/app/Models/ontModels';
import { DataService } from 'src/app/services/data.service';
import { AddModelOnt } from 'src/app/store/ont-model/ontModel.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ont-models',
  templateUrl: './ont-models.component.html',
  styleUrls: ['./ont-models.component.css']
})
export class OntModelsComponent implements OnInit {
  dataJson: any;

  constructor(private DataServcies: DataService, private store: Store, private router: Router) { }

  userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city = CryptoJS.AES.decrypt(this.userLogin.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);

  urlGetData = '/ModeloOnt/filtrarModeloOnt.php?filtrar=&id_ciudad='
  urlFirst = 'ModeloOnt/filtrarModeloOnt.php?filtrar='
  urlSecond = '&id_ciudad=' + this.city
  urlEdit = '/ModeloOnt/editarModeloOnt.php'
  urlCreate = '/ModeloOnt/crearModeloOnt.php'
  urlDeleted = '/ModeloOnt/eliminarModeloOnt.php?id='

  ontModels: OntModels = new OntModels()
  ontModelList!: OntModels[]
  ontModelListAux!: OntModels[]
  ontModelsDetails = new OntModels()

  textoBuscar = ''
  
  pageSize = 5
  since: number = 0
  to: number = 5
  
  addModelOnt(ontModels: OntModels[]) {
    this.store.dispatch(new AddModelOnt(ontModels))
  }

  onKey(event: any){
    let buscarModelList: OntModels[] = []

    if(this.textoBuscar.length != 0){
      this.ontModelListAux.forEach(element => {
    if(element.nombre_modelosont.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1 || element.tipo_modelosont.toLowerCase().indexOf(this.textoBuscar.toLowerCase()) > -1){
          buscarModelList.push(element)
        }
      });
      this.ontModelList = null
      this.ontModelList = buscarModelList
    }else{
      this.ontModelList = this.ontModelListAux
    }
  }

  changePage(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;

  }

  getOntModelByname(ontModelName: string) {
    this.store.select(state => state.ontModels.ontModels).subscribe((data: OntModels[]) => {
      this.ontModelsDetails = data.filter((ontModel) => ontModel.nombre_modelosont == ontModelName)[0]
      console.log(this.ontModelsDetails)
    })
  }

  getOntModelNameByEdit(ontModel: string) {
    this.DataServcies.getOntModelByName(this.urlFirst, this.urlSecond, ontModel).subscribe((data: OntModels[]) => {
      return this.ontModelsDetails = data[0]
    })
  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  save(ontModel: OntModels) {
    this.ontModels.estado_modelosont = 'activo'
    this.ontModels.id_ciudad = Number(this.city)

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando un nuevo modelo ONT...' ,
      showConfirmButton: false,
    })

    if(ontModel.nombre_modelosont == '' || ontModel.tipo_modelosont == ''){
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal!',
        text: 'Algun campo se encuentra vacio',
      })
    }else{
      this.DataServcies.createOntModel(this.urlCreate, ontModel).subscribe(data => {
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
            timer: 2000,
            title: 'Felicidades',
            showConfirmButton: false,
            text: 'Se ha creado un nuevo Model ONT!',
          })
          location.reload()
        }
      })

    }

  }

  edit(ontModel: OntModels) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando informaci??n...',
      showConfirmButton: false,
    })

    if (ontModel.nombre_modelosont == '' || ontModel.tipo_modelosont == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio o no es correcto!',
        showConfirmButton: false,
      })
    } else {
      this.DataServcies.editOntModel(this.urlEdit, ontModel).subscribe(data => {
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
            text: 'Editaste la informaci??n exitosamente!',
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  deleted(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })
    this.DataServcies.deletedCity(this.urlDeleted, id).subscribe(resp => {
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
    if (this.userLogin.nombrerol_rol == 'ADMINISTRADOR') {
      this.DataServcies.getDataModelOnt(this.urlGetData, this.city).subscribe((data: OntModels[]) => {
        this.ontModelList = data
        this.ontModelListAux = data
        this.addModelOnt(data)
        Swal.close()
        if (this.ontModelList == null) {
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
}
