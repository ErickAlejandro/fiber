import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ont } from 'src/app/Models/ont';
import { OntModels } from 'src/app/Models/ontModels';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ont',
  templateUrl: './ont.component.html',
  styleUrls: ['./ont.component.css']
})
export class OntComponent implements OnInit {

  urlGetData = '/Ont/filtrarOnt.php?filtrar=&id_ciudad=9'
  urlFirst = '/Ont/filtrarOnt.php?filtrar='
  urlSecont = '&id_ciudad=9'
  urlEditOnt = '/Ont/editarOnt.php'
  urlDeleted = '/Ont/eliminarOnt.php?id='

  urlModelOnt = '/ModeloOnt/filtrarModeloOnt.php?filtrar=&id_ciudad=9'

  ont: Ont = new Ont()
  ontList!: Ont[]
  ontDetails = new Ont()

  modelOntList!: OntModels[]

  pageSize = 5
  since:number = 0
  to:number = 5

  constructor(private DataService: DataService) { }

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
    this.DataService.getDataModelOnt(this.urlModelOnt).subscribe((data: OntModels[]) =>{
      this.modelOntList = data
    })
  }

  getOntByName(ont: string){
    this.DataService.getOntByName(this.urlFirst, this.urlSecont, ont).subscribe((data: Ont[]) => {
      return this.ontDetails = data[0]
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
    })
  }

}
