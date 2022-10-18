import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cities } from 'src/app/Models/cities';
import { Users } from 'src/app/Models/users';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private DataService: DataService) { }

  urlGetDataUsers = '/usuario/filtrarUsuarioSuperAdmin.php?filtrar='
  urlFirstPart = '/usuario/filtrarUsuario.php?filtrar='
  urlSecondPart = '&id_ciudad=9'
  urlEditUsers = '/usuario/editarUsuario.php'
  urlDeletUser = '/usuario/eliminarUsuario.php?id='
  urlCreateUser = '/usuario/crearUsuario.php'

  urlCities = '/ciudad/filtrarCiudad.php?filtrar='

  usersList!: Users[]
  usersDetails = new Users()
  user: Users = new Users()

  cityList!: Cities[]

  pageSize = 5
  since:number = 0
  to:number = 5

  hide = true;

  changePageUsers(e:PageEvent){
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  save(users: Users){
    users.nombre = users.nombre_usuario
    users.usuario = users.usuario_usuario
    users.contrasena = users.contrasena_usuario
    users.rol = users.id_rol
    users.estado = users.estado
    users.id = users.id_usuario
    
    users.estado = 'activo'

    this.DataService.createUsers(this.urlCreateUser, users).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Agregaste una nueva Ciudad!',
      })
      this.refresh()
    })
  }

  getUserByName(user:string){
    this.DataService.getUserByName(this.urlFirstPart, this.urlSecondPart, user).subscribe((data:Users[]) => {
      return this.usersDetails = data[0]
    })
  }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  editUsers(users: Users){
    
    users.nombre = users.nombre_usuario
    users.usuario = users.usuario_usuario
    users.contrasena = users.contrasena_usuario
    users.rol = users.id_rol
    users.estado = users.estado
    users.id = users.id_usuario
    
    users.estado = 'activo'
    this.DataService.getEditUsers(this.urlEditUsers, users).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'Editaste la información exitosamente!'
      })
      this.refresh()
    })
  }

  getCaptureCity(){
    this.DataService.getData(this.urlCities).subscribe((data: Cities[]) =>{
      this.cityList = data
    })
  }

  deleted(id: any){
    this.DataService.deletedCity(this.urlDeletUser, id).subscribe(res =>{
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

    this.getCaptureCity()

    this.DataService.getDataUsers(this.urlGetDataUsers).subscribe((data: Users[]) =>{
      this.usersList  = data
    })
  }

}
