import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/Models/login';
import { Users } from 'src/app/Models/users';
import { DataService } from 'src/app/services/data.service';
import { AddLogin } from 'src/app/store/login/login.actions';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlDataLogin = '/usuario/buscarUsuario.php?filtrar='
  urlDataUserForLogin = '/usuario/filtrarUsuarioSuperAdmin.php?filtrar='
  loginDetails = new Login()

  hide = true

  user!: string
  password!: string
  rollSuperAdmin: string = 'SUPER ADMINISTRADOR'
  rolAdmin: string = 'ADMINISTRADOR'

  users: Users = new Users

  passwordCrypt = 'fYb3r_H0m3_@BE<3'

  usuariosLog!: any

  loginData!: Login[]

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  addLoginData(login: Login[]) {
    this.store.dispatch(new AddLogin(login))
  }

  login(userName: string, password: string) {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando',
      text: 'Ingresando usuario...',
      showConfirmButton: false,
    })

    this.DataService.getDataLogin(this.urlDataUserForLogin, userName).subscribe((data: Login[]) => {
      this.loginData = data.filter((user) => user.usuario_usuario == userName)
      Swal.close()

      if (this.loginData[0].contrasena_usuario == password) {
        if (this.loginData[0].nombrerol_rol == this.rolAdmin || this.loginData[0].nombrerol_rol == this.rollSuperAdmin) {
          this.addLoginData(data)
          data[0].contrasena_usuario = CryptoJS.AES.encrypt(password.trim(), this.passwordCrypt.trim()).toString()
          data[0].id_rol = -1
          
          if(data[0].id_ciudad == null){
            data[0].id_ciudad
          }else{
            data[0].id_ciudad = CryptoJS.AES.encrypt(data[0].id_ciudad.trim(), this.passwordCrypt.trim()).toString()
          }

          localStorage.setItem('usuarioLogueado', JSON.stringify(data));
          
          this.router.navigate(['usuarios'])
          location.reload()
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lo siento',
            text: 'El usuario no tiene permisos!'
          })
        }
      } else {
        this.refresh()
        Swal.fire({
          icon: 'error',
          title: 'Lo siento',
          text: 'La contraseña es incorrecta!'
        })
      }
    })
  }

  loginLocalStor(user2:Users){
    if (user2.nombrerol_rol == this.rolAdmin) {
      this.router.navigate(['activaciones-pendientes'])
    }
    if(user2.nombrerol_rol == this.rollSuperAdmin){
      this.router.navigate(['usuarios'])
    }
  }

  ngOnInit(): void {
    this.loginLocalStor(JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0])

  }

}
