import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Cities } from 'src/app/Models/cities';
import { Rol } from 'src/app/Models/rol';
import { Users } from 'src/app/Models/users';
import { DataService } from 'src/app/services/data.service';
import { AddUsers } from 'src/app/store/users/users.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  urlGetDataUsers = '/usuario/filtrarUsuarioSuperAdmin.php?filtrar='
  urlFirstPart = '/usuario/filtrarUsuario.php?filtrar='
  urlSecondPart = '&id_ciudad=9'
  urlEditUsers = '/usuario/editarUsuario.php'
  urlDeletUser = '/usuario/eliminarUsuario.php?id='
  urlCreateUser = '/usuario/crearUsuario.php'

  userPreSave!: Users
  respuesta: any = { respuesta: 'ok' }

  id_cities = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
  passwordCrypt = 'fYb3r_H0m3_@BE<3'
  city: any

  urlCities = '/ciudad/filtrarCiudad.php?filtrar='
  urlRol = '/Rol/filtrarRol.php'
  filterPosRol = ''
  filterPosCity = ''

  flagOptions!: string

  cityDetail = new Cities();
  selectCity!: Cities

  dataJson: any

  rolDetail = new Rol()
  usersList!: Users[]
  usersDetails = new Users()
  user: Users = new Users()
  rolList: Rol[] = []

  rol: Rol = new Rol()

  cityList!: Cities[]

  pageSize = 5
  since: number = 0
  to: number = 5

  hide = true;

  addUsers(users: Users[]) {
    this.store.dispatch(new AddUsers(users))
  }

  changePageUsers(e: PageEvent) {
    console.log(e)
    this.since = e.pageIndex * e.pageSize;
    this.to = this.since + e.pageSize;
  }

  botonCrearEditar() {
    if (this.id_cities.id_ciudad != null) {
      this.city = CryptoJS.AES.decrypt(this.id_cities.id_ciudad.trim(), this.passwordCrypt.trim()).toString(CryptoJS.enc.Utf8);
    }
  }

  save(users: Users) {
    users.nombre = users.nombre_usuario
    users.usuario = users.usuario_usuario
    users.contrasena = users.contrasena_usuario
    users.rol = users.id_rol
    users.estado = users.estado
    users.id = users.id_usuario
    users.cambiar_contra_usuario = 'si'

    users.estado = 'activo'

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Creando un nuevo usuario...',
      showConfirmButton: false,
    })
    if (this.id_cities.nombrerol_rol != 'SUPER ADMINISTRADOR') {
      users.id_ciudad = Number(this.city)
    }
    if (users.nombre == '' || users.usuario == '' || users.contrasena == '' || users.id_rol == null || users.id_ciudad == null) {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algun dato se encuentra vacio!',
      })
    } else {
      this.DataService.createUsers(this.urlCreateUser, users).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))
        if (this.dataJson['respuesta'] != 'ok') {
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Agregaste un nuevo Usuario!',
            timer: 2000,
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  preSave(users: Users) {
    this.user = users
  }

  preSaveEdit(usersD: Users) {
    this.usersDetails = usersD
  }


  getUserByName(userName: string) {
    this.store.select(state => state.users.users).subscribe((data: Users[]) => {
      this.usersDetails = data.filter((user) => user.nombre_usuario == userName)[0]
    })
  }

  getUserEdit(user: string) {
    this.DataService.getUserByName(this.urlFirstPart, this.urlSecondPart, user).subscribe((data: Users[]) => {
      return this.usersDetails = data[0]
    })
  }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  editUsers(users: Users) {
    users.nombre = users.nombre_usuario
    users.usuario = users.usuario_usuario
    users.contrasena = users.contrasena_usuario
    users.rol = users.id_rol
    users.estado = users.estado
    users.id = users.id_usuario
    users.cambiar_contra_usuario = 'si'

    users.estado = 'activo'

    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Editando información...',
      showConfirmButton: false,
    })
    if (this.id_cities.nombrerol_rol != 'SUPER ADMINISTRADOR') {
      users.id_ciudad = Number(this.city)
    }
    console.log(users.id_ciudad);

    if (users.nombre == '' || users.usuario == '' || users.contrasena == '' || users.id_rol == null) {
      if (users.nombrerol_rol != 'SUPER ADMINISTRADOR' && users.id_ciudad == null) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Compruebe los datos ingrersados!',
        })
      }
    } else {
      this.DataService.getEditUsers(this.urlEditUsers, users).subscribe(data => {
        Swal.close()
        this.dataJson = JSON.parse(JSON.stringify(data))

        if (this.dataJson['respuesta'] != 'ok') {
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            text: this.dataJson['respuesta'],
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Editaste la información exitosamente!',
            timer: 2000,
            showConfirmButton: false,
          })
          location.reload()
        }
      })
    }
  }

  getCaptureCity() {
    this.DataService.getData(this.urlCities).subscribe((data: Cities[]) => {
      this.cityList = data
    })
  }

  deleted(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Eliminando dato...',
      showConfirmButton: false,
    })
    this.DataService.deletedCity(this.urlDeletUser, id).subscribe(res => {
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: 'El dato fue eliminado con Exito!',
      })
      location.reload()
    })
  }

  getCityByName(cityName: string) {
    this.store.select(state => state.cities.cities).subscribe((data: Cities[]) => {
      this.cityDetail = data.filter((city) => city.nombre_ciudad == cityName)[0]
    });
  }

  ngOnInit(): void {

    Swal.fire({
      icon: 'info',
      title: 'Cargando Datos',
      showConfirmButton: false,
      timerProgressBar: true
    })

    this.getCaptureCity()

    this.DataService.getDataUsers(this.urlGetDataUsers).subscribe((data: Users[]) => {
      this.usersList = data
      this.addUsers(data)
      Swal.close()

      if (this.usersList == null) {
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


    this.DataService.getData(this.urlCities).subscribe((data: Cities[]) => {
      this.cityList = data
    })

    this.DataService.getDataRol(this.urlRol).subscribe((data: Rol[]) => {
      let array: Rol[] = []
      data.forEach(function (element) {
        if (element.nombre_rol != 'SUPER ADMINISTRADOR') {
          array.push(element)
        }
      });
      this.rolList = array
    })


  }

}
