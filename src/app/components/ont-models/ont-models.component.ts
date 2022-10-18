import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OntModels } from 'src/app/Models/ontModels';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ont-models',
  templateUrl: './ont-models.component.html',
  styleUrls: ['./ont-models.component.css']
})
export class OntModelsComponent implements OnInit {

  constructor(private DataServcies: DataService) { }

  urlGetData = '/ModeloOnt/filtrarModeloOnt.php?filtrar=&id_ciudad=9'
  urlFirst = 'ModeloOnt/filtrarModeloOnt.php?filtrar='
  urlSecond = '&id_ciudad=9'
  urlEdit = '/ModeloOnt/editarModeloOnt.php'
  urlCreate = '/ModeloOnt/crearModeloOnt.php'
  urlDeleted = '/ModeloOnt/eliminarModeloOnt.php?id='

  ontModels: OntModels = new OntModels()
  ontModelList!: OntModels[]
  ontModelsDetails = new OntModels()

  pageSize = 5
  since:number = 0
  to:number = 5

  changePage(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
    
  }

  getOntModelByname(ontModel: string){
    this.DataServcies.getOntModelByName(this.urlFirst, this.urlSecond, ontModel).subscribe((data:OntModels[]) => {
      return this.ontModelsDetails = data[0]
    })
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  save(ontModel: OntModels){
    this.ontModels.estado_modelosont = 'activo'
    this.ontModels.id_ciudad = 9
    this.DataServcies.createOntModel(this.urlCreate, ontModel).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste un nuevo Modelo ONT!'
      })
      this.refresh()
    })
  }

  edit(ontModel: OntModels){
    this.DataServcies.editOntModel(this.urlEdit, ontModel).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  deleted(id: any){
    this.DataServcies.deletedCity(this.urlDeleted, id).subscribe(resp => {
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

    this.DataServcies.getDataModelOnt(this.urlGetData).subscribe((data: OntModels[]) => {
      this.ontModelList = data
  })

  }
}
